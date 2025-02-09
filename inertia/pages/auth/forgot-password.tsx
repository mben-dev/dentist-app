import type LoginController from '#controllers/login_controller'
import { ForgotPasswordForm } from '@/components/forgot-password-form.js'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { router } from '@inertiajs/react'
import LayoutAuth from './layout.js'

export default function UserIndex(_props: InferPageProps<LoginController, 'show'>) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // @ts-expect-error
    const formData = new FormData(e.currentTarget)

    const data = {
      email: formData.get('email') as string,
    }

    router.post('/auth/forgot-password', data)
  }

  return (
    <LayoutAuth>
      <ForgotPasswordForm onSubmit={handleSubmit} />
    </LayoutAuth>
  )
}
