
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('page').del()
    .then(function () {
      // Inserts seed entries
      return knex('page').insert([
        {
          pageId: 1, 
          url: 'https://www.pizzahut.com/',
          description: 'Order pizza online for fast delivery or carryout from a store near you. View our full menu, see nutritional information, find store locations, and more.',
          title:'Pizza Hut: Pizza Delivery | Pizza Carryout | Coupons | Wings & More',
          lastModified: null,
          lastIndexed: null
        }
      ]);
    });
};
