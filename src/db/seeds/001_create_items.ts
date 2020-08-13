import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('items').del();

  // Inserts seed entries
  await knex('items').insert([
    {title: 'Frutas', image: 'frutas.svg'},
    {title: 'Legumes', image: 'legumes.svg'},
    {title: 'Verduras', image: 'folhas.svg'},
    {title: 'Ervas', image: 'ervas.svg'},
    {title: 'Leite', image: 'leite.svg'},
    {title: 'Outros', image: 'outros.svg'},
  ]);
}
