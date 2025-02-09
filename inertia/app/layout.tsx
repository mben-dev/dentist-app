// import env from '#start/env'
import { MainNav } from '@/components/main-nav.js'
import { UserNav } from '@/components/user-nav.js'
import { usePage } from '@inertiajs/react'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    props: { user, logo },
    url,
  } = usePage<any>()
  const noLayoutRoute = ['/', '/auth', '/auth/login', '/auth/register']
  if (noLayoutRoute.includes(url)) {
    return <>{children}</>
  }
  return (
    <div>
      {user && (
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <img src={logo} alt="logo" />
            <div className="ml-auto flex items-center space-x-4">
              <MainNav className="mx-6" />

              {/* <Search />
              <UserNav /> */}
              <UserNav />
            </div>
          </div>
        </div>
      )}
      <main className={user ? 'container mx-auto px-4' : ''}>{children}</main>
    </div>
  )
}
