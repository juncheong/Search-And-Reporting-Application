
exports.up = function(knex, Promise) {
    return knex.schema.createTable('word', function (table) {
        table.increments('wordId').primary();
        table.string('word').notNullable();
        //table.time('date');
        //time is probably going to be optional
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('word');
};
