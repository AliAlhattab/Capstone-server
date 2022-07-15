exports.up = function (knex) {
    return knex.schema
      .createTable('usersinfo', (table) => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.string('username').unique().notNullable()
        table.string('password').notNullable();
        table.string('about')
        table.string('github')
        table.string('linkedin')
      })
      .createTable('posts', (table) => {
        table.increments('id').primary();
        table.string('user_id').notNullable();
        table.text('website').notNullable();
        table.text('content').notNullable();
        table.text('tech').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table
          .foreign('user_id')
          .references('id')
          .inTable('usersinfo')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');

      })
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('posts').dropTable('usersinfo')
  };