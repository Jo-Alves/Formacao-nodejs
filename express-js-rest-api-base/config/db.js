var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'jodev',
      password : 'abc123',
      database : 'apiuser'
    }
  });

module.exports = knex