// back end sampling data for users
const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
 
  await knex('users').del();


  const hashedPassword = await bcrypt.hash('password', 10);


  await knex('users').insert([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      password: hashedPassword
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      username: 'janesmith',
      password: hashedPassword
    }
  ]);
};
