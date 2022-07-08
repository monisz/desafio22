const Knex = require('knex').default;
const { mysql } = require('./config');

//Definición tabla productos en MariaDB
const knex = Knex({
    client: 'mysql2',
    connection: mysql.optionsMysql
});
console.log("conectados a mysql");

const defTable = (async () => {
    await knex.schema.dropTableIfExists('products');
    await knex.schema.createTable('products', table => { 
        table.increments('id').primary().notNullable(),
        table.string('title',20).notNullable(),
        table.string('description', 100).notNullable(),
        table.string('code',10).notNullable(),
        table.string('thumbnail').notNullable
        table.float('price').notNullable(),
        table.integer('stock').notNullable(),
        table.string('timestamp')
    });
    console.log("tabla productos creada")
    await knex.destroy();
});


//Definición tabla mensajes en SQLite3
/* const optionsSqlite = { */
/*     client: 'sqlite3', */
/*     connection: { filename: './DB/ecommerce.sqlite' }, */
/*     useNullAsDefault: true */
/* }; */
/*  */
/* const knexSqlite = Knex( */
/*     optionsSqlite */
/* ); */
/*  */
/* const defTableMessages = (async () => { */
/*     await knexSqlite.schema.dropTableIfExists('messages'); */
/*     await knexSqlite.schema.createTable('messages', table => { */
/*         table.string('email',50).notNullable(), */
/*         table.date('date'), */
/*         table.string('text',100) */
/*     }); */
/*     console.log('paso x def messages') */
/*     await knexSqlite.destroy(); */
/* }) (); */
/*  */