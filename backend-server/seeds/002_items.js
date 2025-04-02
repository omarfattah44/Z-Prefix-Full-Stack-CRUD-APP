// back end sampling data for items
exports.seed = async function(knex) {
   
    await knex('items').del();
  
    
    await knex('items').insert([
      {
        id: 1,
        userId: 1, 
        name: 'Sample Item 1',
        description: 'This is a sample item description',
        quantity: 10
      },
      {
        id: 2,
        userId: 2, 
        name: 'Sample Item 2',
        description: 'Another sample item description',
        quantity: 5
      }
    ]);
  };
  