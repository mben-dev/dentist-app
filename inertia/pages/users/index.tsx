import type UsersController from '#controllers/users_controller'
import User from '#models/user'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { InferPageProps } from '@adonisjs/inertia/types'

type Props = InferPageProps<UsersController, 'index'> & {
  users: User[]
}

export default function UserIndex(props: Props) {
  const userRoles = {
    admin: 'Administrateur',
    doctor: 'Docteur',
    lab: 'Laboratoire',
  }
  return (
    <Table>
      <TableCaption>Listes des utilisateurs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Rôle</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Nbr de demande</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.users?.map((user: User) => {
          return (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.fullName}</TableCell>
              <TableCell>{userRoles[user.role]}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
