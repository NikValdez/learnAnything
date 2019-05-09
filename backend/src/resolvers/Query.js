const { forwardTo } = require('prisma-binding')
const { hasPermission } = require('../utils')

const Query = {
  curricula: forwardTo('db'),
  curriculum: forwardTo('db'),
  me(parent, args, ctx, info) {
    if (!ctx.req.userId) {
      return null
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.req.userId }
      },
      info
    )
  }
}

module.exports = Query
