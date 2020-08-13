import path from 'path';

// module.exports = {
//   client: 'sqlite3',
//   connection: {
//     filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
//   },
//   migrations: {
//     directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
//   },
//   seeds: {
//     directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
//   },
//   useNullAsDefault: true,
// };

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'pontes-da-terra',
      user: 'postgres',
      password: '8788003',
    },
    migrations: {
      directory: `${__dirname}/src/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/db/seeds`,
    },
  },
};
