import User from '#models/user'
import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const email = env.get('ADMIN_EMAIL')

    const admin = await User.findBy('email', email)
    if (admin) {
      console.log('Admin already exist.')
      return
    }

    await User.create({
      email,
      fullName: 'admin',
      password: env.get('ADMIN_PASSWORD'),
      role: 'admin',
    })

    console.log('Superadmin created')
  }
}
