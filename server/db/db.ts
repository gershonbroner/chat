const knex = require('knex');
const config = require('./knexfile'); // Adjust the path if needed

 const db = knex(config);
 export default db ;

// You can now use the 'db' object to perform database operations
