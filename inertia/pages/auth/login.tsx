import type LoginController from '#controllers/login_controller'
import { LoginForm } from '@/components/login-form'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { router, usePage } from '@inertiajs/react'
import { useState } from 'react'

export default function UserIndex(_props: InferPageProps<LoginController, 'show'>) {
  const { user } = usePage<any>().props
  const [errors, setErrors] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors(null)

    const formData = new FormData(e.currentTarget)

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    router.post('/auth/login', data, {
      onError: (err) => setErrors(err.error || 'Authentication failed'),
    })
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            {/* <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div> */}
            <img src="https://img.logoipsum.com/244.svg" alt="logo" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onSubmit={handleSubmit} />
            {errors && <p className="text-red-500">{errors}</p>}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://ui.shadcn.com/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
