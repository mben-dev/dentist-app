import type AsksController from '#controllers/asks_controller'
import type Ask from '#models/ask'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import usePageProps from '@/hooks/use_page_props'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import { MoveLeft } from 'lucide-react'

type Props = InferPageProps<AsksController, 'show'> & {
  ask: Ask & { signedUrl: { name: string; url: string }[] }
}

export default function AskShow(props: Props) {
  const propsPage = usePageProps<Props>()

  const askStatus = {
    await_information: "En attente d'information",
    in_progress: 'Setup en cours',
    to_validate: 'Setup à valider',
    ask_change: 'Demande de modification',
    done: 'Setup disponible',
  }
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <Link href="/asks">
          <Button variant="ghost">
            <MoveLeft className="mr-2" /> Retour
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold">Dossier {props.ask.patientId}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informations du patient</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Status</Label>
              <div>{askStatus[props.ask.status as keyof typeof askStatus]}</div>
            </div>
            <div>
              <Label>Âge</Label>
              <div>{props.ask.age} ans</div>
            </div>
            <div>
              <Label>Sexe</Label>
              <div>{props.ask.sexe === 'f' ? 'Femme' : 'Homme'}</div>
            </div>
          </div>
          <div>
            <Label>Type de traitement</Label>
            <div>{props.ask.typeTraitement}</div>
          </div>
          <div>
            <Label>Particularités</Label>
            <div>{props.ask.particularites}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images et radiographies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {props.ask.signedUrl.map((file, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={file.url || '/placeholder.svg'}
                  alt={file.name}
                  style={{ objectFit: 'cover' }}
                  className="rounded-md"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm truncate">
                  {file.name}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
