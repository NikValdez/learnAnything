const { forwardTo } = require('prisma-binding')
const { hasPermission } = require('../utils')

const Query = {
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    )
  }
}

module.exports = Query
