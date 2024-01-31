import vine from '@vinejs/vine'

export const createAuthRegisterValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    username: vine.string().minLength(3),
    password: vine.string().minLength(8).confirmed({ confirmationField: 'repeat_password'}),
  })
)

export const createAuthLoginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
  })
)
