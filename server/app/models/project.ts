import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare text: string

  @column()
  declare image: string | null // image is a url to the image file

  @column()
  declare isPublished: boolean

  @column()
  declare color: string

  @column()
  declare isPin: boolean

  @column()
  declare userId: number

  @column()
  declare tags: string[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
