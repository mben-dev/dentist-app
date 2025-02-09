import ResetPasswordsController from '#controllers/reset_passwords_controller'
import { ResetPasswordForm } from '@/components/reset-password-form.js'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { router, usePage } from '@inertiajs/react'
import LayoutAuth from './layout.js'

export default function UserIndex({
  token,
}: InferPageProps<ResetPasswordsController, 'resetPassword'>) {
  const { props } = usePage<any>()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // @ts-expect-error
    const formData = new FormData(e.currentTarget)

    const data = {
      password: formData.get('password') as string,
      password_confirmation: formData.get('password_confirmation') as string,
      token: formData.get('token') as string,
    }

    router.post('/auth/reset-password', data)
  }

  return (
    <LayoutAuth>
      <ResetPasswordForm errors={props.errors} onSubmit={handleSubmit} token={token} />
    </LayoutAuth>
  )
}
