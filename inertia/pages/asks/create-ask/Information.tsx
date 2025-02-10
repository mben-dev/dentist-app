import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { SelectTrigger } from '@radix-ui/react-select'

export const Information = ({ data, setData }: { data: any; setData: any }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="patientId">Nom ou numéro du patient</Label>
        <Input
          id="patientId"
          value={data.patientId}
          onChange={(e) => setData({ ...data, patientId: e.target.value })}
          placeholder="Entrez le nom ou le numéro du patient"
        />
      </div>

      <div>
        <Label htmlFor="age">Âge</Label>
        <Input
          id="age"
          type="number"
          value={data.age}
          onChange={(e) => setData({ ...data, age: e.target.value })}
          placeholder="Entrez l'âge du patient"
        />
      </div>

      <div>
        <Label>Sexe</Label>
        <RadioGroup
          value={data.sexe}
          onValueChange={(value) => setData({ ...data, sexe: value })}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="m" id="homme" />
            <Label htmlFor="homme">Homme</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="f" id="femme" />
            <Label htmlFor="femme">Femme</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="typeTraitement">Type de traitement souhaité</Label>
        <Select
          value={data.typeTraitement}
          onValueChange={(value) => setData({ ...data, typeTraitement: value })}
        >
          <SelectTrigger id="typeTraitement" className="border-solid">
            <SelectValue placeholder="Sélectionnez le type de traitement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="extraction">Extraction</SelectItem>
            <SelectItem value="non-extraction">Non-extraction</SelectItem>
            <SelectItem value="classe-i">Classe I</SelectItem>
            <SelectItem value="classe-ii">Classe II</SelectItem>
            <SelectItem value="classe-iii">Classe III</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="particularites">Particularités ou attentes spécifiques</Label>
        <Textarea
          id="particularites"
          value={data.particularites}
          onChange={(e) => setData({ ...data, particularites: e.target.value })}
          placeholder="Expansion, distalisation, correction des classes dentaires avec élastiques, stripping, taquets, dents à ne pas bouger, minivis, etc."
          className="h-32"
        />
      </div>
    </div>
  )
}
