import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'files'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table.integer('ask_id').references('id').inTable('asks').onDelete('CASCADE')

      table.string('path').notNullable()
      table.string('filename').notNullable()
      table.string('mime_type').notNullable()
      table.integer('size').notNullable()

      table.enum('type', ['INPUT', 'OUTPUT']).defaultTo('INPUT')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
