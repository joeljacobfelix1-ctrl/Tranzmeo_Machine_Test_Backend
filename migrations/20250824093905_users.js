// migrations/20230824120000-create-users.js

export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id'); // auto-increment primary key
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('gender');
    table.boolean('deleted').defaultTo(false);
    table.timestamps(true, true); // created_at & updated_at
  });
}

export async function down(knex) {
  await knex.schema.dropTable('users');
}
