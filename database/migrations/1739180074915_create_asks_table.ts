import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'asks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('patient_id').notNullable()
      table.integer('age').notNullable()
      table.enum('sexe', ['m', 'f']).notNullable()
      table.string('type_traitement')
      table.string('particularites')
      table
        .enum('status', ['await_information', 'in_progress', 'to_validate', 'ask_change', 'done'])
        .notNullable()
        .defaultTo('await_information')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
