// // const knexfile = require('../../knexfile');
// import knexfile from '../../knexfile';

// const knex = require('knex')(knexfile['development']);

// export default knex;

import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    database: 'pontes-da-terra',
    user: 'postgres',
    password: '8788003',
  },
});

export default connection;
