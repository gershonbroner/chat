 
// knexfile.js

module.exports = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'chat',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
};

 