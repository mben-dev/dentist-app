'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FileWithPreview extends File {
  preview?: string
}

interface FilesProps {
  data: {
    files: FileWithPreview[]
    [key: string]: any
  }
  setData: (callback: (prevData: any) => any) => void
}

export const Files = ({ data, setData }: FilesProps) => {
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) =>
      ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
    ) as FileWithPreview[]

    if (validFiles.length !== files.length) {
      setError(
        "Certains fichiers n'ont pas été ajoutés car ils ne sont pas au format jpg, jpeg ou png."
      )
    } else {
      setError(null)
    }

    // Créer les URLs de prévisualisation pour les nouveaux fichiers
    validFiles.forEach((file) => {
      file.preview = URL.createObjectURL(file)
    })

    setData((prevData: any) => ({
      ...prevData,
      files: [...prevData.files, ...validFiles],
    }))
  }

  const removeFile = (index: number) => {
    setData((prevData: any) => ({
      ...prevData,
      files: prevData.files.filter((_: any, i: number) => i !== index),
    }))
  }

  // Nettoyer les URLs de prévisualisation lors du démontage du composant
  useEffect(() => {
    return () => {
      data.files.forEach((file: FileWithPreview) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [])

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="files">Radios et photos</Label>
        <Input
          id="files"
          type="file"
          multiple
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="cursor-pointer"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {data.files.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Aperçu des fichiers :</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.files.map((file: FileWithPreview, index: number) => (
              <div key={index} className="relative aspect-square group">
                <img
                  src={file.preview || '/placeholder.svg'}
                  alt={`Aperçu ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
