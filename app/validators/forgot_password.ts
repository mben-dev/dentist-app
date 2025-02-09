import vine from '@vinejs/vine'

export const forgotPassword = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
  })
)

export const resetPassword = vine.compile(
  vine.object({
    token: vine.string(),
    email: vine.string().email().normalizeEmail(),
  })
)

export const handleResetPassword = vine.compile(
  vine.object({
    token: vine.string(),
    password: vine.string().trim().minLength(8),
    password_confirmation: vine.string().trim().sameAs('password'),
  })
)
