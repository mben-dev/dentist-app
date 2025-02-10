import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import File from './file.js'
import User from './user.js'

export default class Ask extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare patientId: string

  @column()
  declare age: number

  @column()
  declare sexe: string

  @column()
  declare typeTraitement: string

  @column()
  declare particularites: string

  @column()
  declare status: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => File)
  declare files: HasMany<typeof File>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
