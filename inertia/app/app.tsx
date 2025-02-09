/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/react'
import { JSX, ReactNode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import '../css/app.css'
import Layout from './layout.js'

// Utiliser directement import.meta.env pour les variables d'environnement côté client
const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

type PageType = {
  default: {
    layout?: (page: ReactNode) => JSX.Element
  }
}

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title: string) => `${title} - ${appName}`,

  resolve: async (name: string) => {
    const page = (await resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    )) as PageType

    page.default.layout = page.default.layout || ((page: ReactNode) => <Layout children={page} />)

    return page
  },

  setup({ el, App, props }: { el: HTMLElement; App: (props: any) => JSX.Element; props: any }) {
    hydrateRoot(el, <App {...props} />)
  },
})
