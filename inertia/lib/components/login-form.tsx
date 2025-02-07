import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Se connecter à mon compte</h1>
        {/* <p className="text-balance text-sm text-muted-foreground">
          Entrez votre email et votre mot de passe pour vous connecter.
        </p> */}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mot de passe</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
          <Input name="password" id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Connexion
        </Button>
      </div>
    </form>
  )
}
