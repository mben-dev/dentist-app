import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import usePageProps from '@/hooks/use_page_props'
import { Link, router } from '@inertiajs/react'
import { MoveLeft } from 'lucide-react'
import { useState } from 'react'
import { AcceptClause } from './AcceptClause'
import { Files } from './Files'
import { Information } from './Information'

export default function CreateUser() {
  const props = usePageProps()
  console.log(props)
  const [data, setData] = useState({
    accepteClauses: false,
    patientId: '',
    age: '',
    sexe: '',
    typeTraitement: '',
    particularites: '',
    files: [],
  })
  const [step, setStep] = useState(0)

  const steps = [
    { titre: 'Acceptation des clauses', component: AcceptClause },
    { titre: 'Informations du traitement', component: Information },
    { titre: 'Envoi des fichiers', component: Files },
  ]

  const handleNext = () => {
    if (step === 0 && !data.accepteClauses) {
      alert("Veuillez accepter les conditions d'utilisation avant de continuer.")
      return
    }
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Formulaire soumis', data)
    router.post('/asks/create', data)
  }

  const ComponentCurrentStep = steps[step].component

  const progressPercentage = ((step + 1) / steps.length) * 100

  return (
    <div className="flex flex-col gap-5 p-4">
      <div>
        <Link href="/asks">
          <Button variant="ghost">
            <MoveLeft /> Retour
          </Button>
        </Link>
      </div>
      <div className="text-xl">Créer une demande de traitement</div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{steps[step].titre}</CardTitle>
          <Progress value={progressPercentage} className="w-full" />
          <div className="text-sm text-muted-foreground mt-2">
            Étape {step + 1} sur {steps.length}
          </div>
        </CardHeader>
        <CardContent>
          <ComponentCurrentStep setData={setData} data={data} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrevious} disabled={step === 0}>
            Précédent
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={handleNext}>Suivant</Button>
          ) : (
            <Button onClick={handleSubmit}>Soumettre</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
