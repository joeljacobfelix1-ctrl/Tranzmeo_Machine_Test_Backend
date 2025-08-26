export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', gender: 'Female', deleted: false },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', gender: 'Male', deleted: false },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', gender: 'Male', deleted: false },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', gender: 'Female', deleted: false },
  ]);
};
