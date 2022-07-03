exports.up = function (knex) {
    return knex.schema
      .createTable('usersInfo', (table) => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('username').unique().notNullable()
        table.string('password').notNullable();
      })
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('usersInfo')
  };