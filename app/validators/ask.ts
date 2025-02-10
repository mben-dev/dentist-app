import vine from '@vinejs/vine'

export const store = vine.compile(
  vine.object({
    patientId: vine.string(),
    age: vine.number(),
    sexe: vine.string(),
    typeTraitement: vine.string(),
    particularites: vine.string(),
    files: vine.array(vine.file()),
  })
)
