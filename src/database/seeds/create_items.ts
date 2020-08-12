import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    {title: 'Frutas', image: 'frutas.svg'},
    {title: 'Legumes', image: 'legumes.svg'},
    {title: 'Verduras', image: 'folhas.svg'},
    {title: 'Ervas', image: 'ervas.svg'},
    {title: 'Leite', image: 'leite.svg'},
    {title: 'Outros', image: 'outros.svg'},
  ]);
}
