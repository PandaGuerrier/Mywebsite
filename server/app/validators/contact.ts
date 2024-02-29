import vine from '@vinejs/vine'

export const createContactValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    name: vine.string().minLength(3),
    subject: vine.string().minLength(3),
    message: vine.string().minLength(10),
  })
)
