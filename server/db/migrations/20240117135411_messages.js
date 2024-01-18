/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('messages', function (table) {
        table.string('id1');
        table.string('id2');
        table.string('text');
        table.timestamps(true,true);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return  knex.schema.dropTable('messages')
};
