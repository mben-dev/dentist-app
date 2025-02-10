import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> & { token: string; errors: Record<string, string> }) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Définir un mot de passe</h1>
        {/* <p className="text-balance text-sm text-muted-foreground">
          Entrez votre email et votre mot de passe pour vous connecter.
        </p> */}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mot de passe</Label>
          </div>
          <Input name="password" id="password" type="password" required />
          {props?.errors?.password && (
            <p className="text-red-500 text-xs">{props.errors.password}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Confirmé mot de passe</Label>
          </div>
          <Input name="password_confirmation" id="password_confirmation" type="password" required />
          {props?.errors?.password_confirmation && (
            <p className="text-red-500 text-xs">{props.errors.password_confirmation}</p>
          )}
        </div>
        <input type="hidden" name="token" value={props.token} />
        <Button type="submit" className="w-full">
          Sauvegarder
        </Button>
      </div>
    </form>
  )
}
