
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pageWord', function(table){
        table.increments("pageWordId").primary();

        table.integer('wordId').unsigned();
        table.foreign('wordId').references('wordId').inTable('word');

        table.integer('pageId').unsigned()
        table.foreign('pageId').references('pageId').inTable('page');

        table.integer('wordCount');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('pageWord');
};
