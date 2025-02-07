import { createInertiaApp } from '@inertiajs/react'
import { JSX, ReactNode } from 'react'
import ReactDOMServer from 'react-dom/server'
import Layout from '../layout'

type PageType = {
  default: {
    layout?: (page: ReactNode) => JSX.Element
  }
}

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      const resolvedPage = pages[`../pages/${name}.tsx`] as PageType

      resolvedPage.default.layout =
        resolvedPage.default.layout || ((page: ReactNode) => <Layout children={page} />)
      return resolvedPage
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
