import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ inertia }: HttpContext) {
    // const page = request.input('page', 1)
    const users = await User.query()
    return inertia.render('users/index', { users })
  }
}
