
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('word').del()
    .then(function () {
      // Inserts seed entries
      return knex('word').insert([
        {wordId: 1, word: 'pizza'},
      ]);
    });
};
