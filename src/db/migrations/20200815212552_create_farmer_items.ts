import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('farmer_items', (table) => {
    table.increments('id').primary();
    table
      .integer('farmer_id')
      .notNullable()
      .references('id')
      .inTable('farmers');
    table.integer('item_id').notNullable().references('id').inTable('items');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('farmer_items');
}
