import { Button } from '@/components/ui/button.js'
import { Head, Link } from '@inertiajs/react'

export default function Home() {
  return (
    <div>
      <Head title="Homepage" />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4 text-center">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Site en cours de construction
          </h1>
          <p className="text-lg text-gray-600">
            Nous travaillons dur pour vous offrir une expérience exceptionnelle. Revenez bientôt !
          </p>
          <Link href="/auth/login">
            <Button size="lg">Se connecter</Button>
          </Link>
        </div>
      </main>{' '}
    </div>
  )
}
