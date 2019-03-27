
exports.up = function(knex, Promise) {
    return knex.schema.createTable('page', function(table){
        table.increments('pageId').primary();
        table.string('url').notNullable();
        table.string('description');
        table.string('title');
        table.timestamp('lastModified').defaultTo(knex.fn.now());
        table.timestamp('lastIndexed').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('page');
};
