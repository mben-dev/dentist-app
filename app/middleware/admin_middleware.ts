import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user

    if (user?.role !== 'admin') {
      // ctx.response.redirect('/404')
      throw new Exception('Non autorisé', { code: 'E_NOT_AUTHORIZED', status: 401 })
    }
    return next()
  }
}
