import { ForgotPasswordTemplate } from '#mails/forgot_password'
import Token from '#models/token'
import User from '#models/user'
import env from '#start/env'
import { forgotPassword, handleResetPassword, resetPassword } from '#validators/forgot_password'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { render } from '@react-email/components'
import { DateTime } from 'luxon'

export default class ResetPasswordsController {
  async forgotPassword({ inertia, auth }: HttpContext) {
    if (auth.isAuthenticated) {
      const user = await auth.authenticate()
      return inertia.location(user.role === 'admin' ? '/admin/users' : '/dashboard')
    }
    return inertia.render(
      'auth/forgot-password',
      {},
      {
        title: 'Loroisum - Mot de passe oublié',
        description: `Réinitialisez votre mot de passe ${env.get('APP_NAME')}`,
      }
    )
  }

  async handleForgotPassword({ request, response, session }: HttpContext) {
    const { email } = await request.validateUsing(forgotPassword)

    const user = await User.findBy('email', email)
    if (!user || !user.password) {
      session.flash('message', "Ce compte n'existe pas")
      return response.redirect().toRoute('login.show')
    }
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
        .to(user.email)
        .subject(`${env.get('APP_NAME')} - Réinitialiser votre mot de passe`)
        .html(template)
    })
    session.flash('success', 'Un email a été envoyé à votre adresse email')

    response.redirect().toRoute('auth:forgot-password')
  }

  async resetPassword({ request, response, session, inertia }: HttpContext) {
    const { token, email } = await request.validateUsing(resetPassword)

    const tokenObj = await Token.findBy('token', token)

    if (
      !tokenObj ||
      tokenObj.isUsed ||
      DateTime.now() > tokenObj.expiresAt ||
      tokenObj.email !== email
    ) {
      session.flash('error', 'Lien expiré ou invalide')
      response.redirect().toRoute('auth:forgot-password')
    }

    return inertia.render(
      'auth/reset-password',
      {
        email,
        token,
      },
      {
        title: `${env.get('APP_NAME')} - Mot de passe oublié`,
        description: `Réinitialisez votre mot de passe ${env.get('APP_NAME')}`,
      }
    )
  }

  async handleResetPassword({ request, response, session }: HttpContext) {
    const { token, password } = await request.validateUsing(handleResetPassword)

    const tokenObj = await Token.findBy('token', token)

    if (!tokenObj || tokenObj.isUsed || DateTime.now() > tokenObj.expiresAt) {
      session.flash('error', 'Lien expiré ou invalide')
      response.redirect().toRoute('auth:forgot-password')
    }

    const user = await User.findBy('email', tokenObj?.email)

    if (!user) {
      session.flash('error', 'Compte inexistant')
      response.redirect().toRoute('auth:forgot-password')
    }
    if (!user?.isActive && !user?.password) {
      await user?.merge({ password, isActive: true }).save()
    } else {
      await user?.merge({ password }).save()
    }
    await tokenObj?.merge({ isUsed: true }).save()

    session.flash('success', 'Mot de passe modifié avec succès')
    response.redirect().toRoute('auth:login')
  }
}
