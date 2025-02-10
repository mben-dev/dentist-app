import drive from '@adonisjs/drive/services/main'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Ask from './ask.js'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare askId: number

  @belongsTo(() => Ask)
  declare ask: BelongsTo<typeof Ask>

  @column()
  declare path: string

  @column()
  declare filename: string

  @column()
  declare mimeType: string

  @column()
  declare size: number

  @column()
  declare type: 'INPUT' | 'OUTPUT'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  async generateSignedUrl() {
    return await drive.use().getSignedUrl(this.path, {
      expiresIn: '1h', // Lien valable 1 heure
    })
  }
}
