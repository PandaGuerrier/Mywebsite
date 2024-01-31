import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('role').defaultTo('user')
      table.boolean('is_admin').defaultTo(false)
      table.string('remember_me_token').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
