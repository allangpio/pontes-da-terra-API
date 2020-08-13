import * as Knex from 'knex';

// talvez tenha que jogar um .unique() em algum campo para não permitir criar pontos duplicados
// tirei o .primary() do id pra ver se rola, pq está dando erro
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('farmers', (table) => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('farmers');
}
