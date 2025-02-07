import { cn } from '@/lib/utils'
import { Link, usePage } from '@inertiajs/react'

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { user } = usePage<any>().props
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      <Link href="/asks" className="text-sm font-medium transition-colors ">
        Demande
      </Link>
      {user?.role === 'admin' && (
        <Link href="/admin/users" className="text-sm font-medium  transition-colors ">
          Utilisateurs
        </Link>
      )}
    </nav>
  )
}
