const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const { promisify } = require('util')
const { hasPermission } = require('../utils')
const { transport, emailTemplate } = require('../mail')
// const moment = require('moment')

const Mutations = {
  async signup(parent, args, ctx, info) {
    // lowercase their email
    args.email = args.email.toLowerCase()
    // hash their password
    const password = await bcrypt.hash(args.password, 10)
    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] }
        }
      },
      info
    )
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    // We set the jwt as a cookie on the response

    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    })
    // Finalllllly we return the user to the browser

    return user
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email ${email}`)
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid Password!')
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    // 4. Set the cookie with the token
    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    })
    // 5. Return the user
    return user
  },
  signout(parent, args, ctx, info) {
    ctx.res.clearCookie('token')
    return { message: 'Signed out' }
  },

  async requestReset(parent, args, ctx, info) {
    //1. check if this is a real user
    const user = await ctx.db.query.user({ where: { email: args.email } })
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`)
    }
    //2.set a reset token and expiry on that user
    const randomBytesPromiseified = promisify(randomBytes)
    const resetToken = (await randomBytesPromiseified(20)).toString('hex')
    const resetTokenExpiry = Date.now() + 3600000 //1 hour
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    })

    //3.Email them that reset token
    const mailRes = await transport.sendMail({
      from: 'syllabi@syllabi.com',
      to: user.email,
      subject: 'Your password reset token',
      html: emailTemplate(`Your Password Reset Token is Here! 
      \n\n 
      <a href="${
        process.env.FRONTEND_URL
      }/reset/${resetToken}">Click Here to Reset</a>`)
    })
    return { message: 'Thanks' }
  },

  async resetPassword(parent, args, ctx, info) {
    if (args.password !== args.confirmPassword) {
      throw new Error("Your Passwords don't match!")
    }
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    })
    if (!user) {
      throw new Error('This token is invalid or expired!')
    }
    const password = await bcrypt.hash(args.password, 10)

    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    })
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET)
    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 265
    })
    return updatedUser
  },

  async createCurriculum(parent, args, ctx, info) {
    if (!ctx.req.userId) {
      throw new Error('You must be logged in to do that!')
    }
    const curriculum = await ctx.db.mutation.createCurriculum(
      {
        data: {
          user: {
            connect: {
              id: ctx.req.userId
            }
          },
          ...args
        }
      },
      info
    )
    return curriculum
  },
  async createLike(parent, args, ctx, info) {
    if (!ctx.req.userId) {
      throw new Error('You must be logged in to do that!')
    }
    //Create the like
    return ctx.db.mutation.updateCurriculum(
      {
        data: {
          likedBy: {
            connect: {
              id: ctx.req.userId
            }
          }
        },
        where: {
          id: args.id
        }
      },
      info
    )
  }
}

module.exports = Mutations
