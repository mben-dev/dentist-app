import User from '#models/user'
import { store } from '#validators/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async store({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(store)

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)
    console.log('user logged in')

    response.redirect().toRoute(user.role === 'admin' ? 'admin:users' : 'dashboard')
  }
  async show({ inertia, auth }: HttpContext) {
    if (auth.isAuthenticated) {
      const user = await auth.authenticate()
      return inertia.location(user.role === 'admin' ? '/admin/users' : '/dashboard')
    }
    return inertia.render('auth/login')
  }
}
