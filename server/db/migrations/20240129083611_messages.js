/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable("messages" ,function(table){
    table.increments('id').primary();
    table.string('text', 255).notNullable();
    table.string('IdSender', 255).notNullable();
    table.integer('IdConversation').references('id').inTable('conversations');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.typemessage(character)
  }

  )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("messages")
};
