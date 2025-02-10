import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import usePageProps from '@/hooks/use_page_props'
import { Link, router } from '@inertiajs/react'
import { MoveLeft } from 'lucide-react'

export default function CreateUser() {
  const props = usePageProps()
  console.log(props)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const data = {
      email: formData.get('email') as string,
      fullName: formData.get('fullName') as string,
      role: formData.get('role') as string,
    }

    router.post('/admin/users/create', data)
  }

  return (
    <div className="flex flex-col gap-5 p-4">
      <div>
        <Link href="/admin/users">
          <Button variant="ghost">
            <MoveLeft /> Retour
          </Button>
        </Link>
      </div>
      <div className="text-xl">Créer un utilisateur</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-4 items-end">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fullName">Nom</Label>
            <Input id="fullName" name="fullName" type="text" placeholder="Dr. John Doe" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Rôle</Label>
            <Select name="role" defaultValue="lab">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sélectionnez un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Rôle</SelectLabel>
                  <SelectItem value="lab">Laboratoire</SelectItem>
                  <SelectItem value="doctor">Docteur</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Inviter</Button>
        </div>
      </form>
    </div>
  )
}
