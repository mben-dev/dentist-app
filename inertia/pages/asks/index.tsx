import type AsksController from '#controllers/asks_controller'
import Ask from '#models/ask'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import usePageProps from '@/hooks/use_page_props'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import { ExternalLink } from 'lucide-react'

type Props = InferPageProps<AsksController, 'index'> & {
  asks: Ask[]
}

const askStatus = {
  await_information: "En attente d'information",
  in_progress: 'Setup en cours',
  to_validate: 'Setup à valider',
  ask_change: 'Demande de modification',
  done: 'Setup disponible',
}

export default function AskIndex(props: Props) {
  const propsPage = usePageProps<Props>()

  console.log(props.asks)
  return (
    <div className="flex flex-col gap-2">
      <div className="p-2 flex flex-row justify-between">
        <div>filter</div>
        <Link href="/asks/create">
          <Button>Créer une demande</Button>
        </Link>
      </div>
      <div>
        {propsPage?.messages?.success && (
          <p className="text-green-500">{props.messages?.success}</p>
        )}
      </div>
      <Table>
        <TableCaption>Listes de mes demandes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.asks?.map((ask: Ask) => {
            return (
              <TableRow key={ask.id}>
                <TableCell className="font-medium">{ask.patientId}</TableCell>
                <TableCell>{askStatus[ask.status as keyof typeof askStatus]}</TableCell>
                <TableCell>{new Date(`${ask.createdAt}`).toLocaleString('fr-Fr')}</TableCell>
                <TableCell>
                  <a href={`asks/${ask.id}`}>
                    <Button variant="link">
                      <ExternalLink />
                    </Button>
                  </a>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
