// import env from '#start/env'
import usePageProps from '@/hooks/use_page_props'

export default function LayoutAuth({ children }: { children: React.ReactNode }) {
  const props = usePageProps<{ logo: string; exceptions?: any; messages?: any }>()

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            {/* <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div> */}
            <img src={props.logo} alt="logo" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {children}

            {props.exceptions?.E_INVALID_CREDENTIALS && (
              <p className="text-red-500">L'email ou le mot de passe est incorrect</p>
            )}
            {props.messages && props.messages?.message && (
              <p className="text-red-500">{props.messages?.message}</p>
            )}
            {props.messages && props.messages?.success && (
              <p className="text-green-500">{props.messages?.success}</p>
            )}
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
