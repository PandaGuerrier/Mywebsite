import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3),
    description: vine.string().minLength(3),
    text: vine.string().minLength(3),
    image: vine.string().nullable(),
    isPublished: vine.boolean(),
    userId: vine.number(),
    tags: vine.array(vine.string()),
  })
);
