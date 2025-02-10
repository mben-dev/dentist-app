import User from '#models/user'
import { store } from '#validators/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async store({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(store)

    const user = await User.verifyCredentials(email, password)
    if (!user) {
      return session.flashMessages.merge({ errors: 'Email ou mot de passe incorrect' })
    }

    await auth.use('web').login(user)

    response.redirect().toRoute(user.role === 'admin' ? 'admin:users' : 'asks')
  }
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }
}
