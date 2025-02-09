import Token from '#models/token'
import User from '#models/user'
import env from '#start/env'
import ForgotPasswordTemplate from '#templates/forgot_password'
import { store } from '#validators/user'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { render } from '@react-email/components'
import { DateTime } from 'luxon'

export default class UsersController {
  async index({ inertia }: HttpContext) {
    // const page = request.input('page', 1)
    const users = await User.query()
    return inertia.render('users/index', { users })
  }

  createUser({ inertia }: HttpContext) {
    return inertia.render('users/create-user/index', {}, { title: 'Créer un utilisateur' })
  }

  async store({ request, response, session }: HttpContext) {
    const { email, ...payload } = await request.validateUsing(store)

    await User.create({ ...payload, email, isActive: false })

    const token = stringHelpers.generateRandom(64)
    const url = `${env.get('APP_URL')}/auth/reset-password/?token=${token}&email=${email}`
    await Token.create({
      token,
      email,
      expiresAt: DateTime.now().plus({ minutes: 20 }),
    })
    const template = await render(ForgotPasswordTemplate({ url: url }))

    await mail.send(async (message) => {
      message
        .from(env.get('FROM_EMAIL'))
        .to(email)
        .subject(`${env.get('APP_NAME')} - Invitation à rejoindre`)
        .html(template)
    })
    session.flash('success', 'Utilisateur invité avec succès')
    response.redirect().toRoute('admin:users')
  }
}
