import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SessionMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = await ctx.auth.authenticate()

    user && ctx.inertia.share({ user })
    return next()
  }
}
