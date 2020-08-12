import Knex from 'knex';

export async function up(knex: Knex) {
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

export async function down(knex: Knex) {
  return knex.schema.dropTable('farmer_items');
}
