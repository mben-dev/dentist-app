import vine from '@vinejs/vine'

export const store = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    role: vine.enum(['admin', 'doctor', 'lab']),
    fullName: vine.string().trim().minLength(2),
  })
)
