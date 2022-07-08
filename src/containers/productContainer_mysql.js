const Knex = require('knex').default;
const { mysql } = require('../../config');
const { faker } = require('@faker-js/faker');

const knex = Knex({
    client: 'mysql',
    connection: mysql.optionsMysql
});
console.log("conectados a mysql");

class Container {
    constructor (table) {
        this.table = table;
    }    

    async save(element) {
        try {
            console.log("el que recibe en save", element)
            const res = await knex(this.table).insert(element);
            console.log("res en save", res) 
            return res;
        }
        catch (error) {
            console.log("error en Save): ", error);
            return [];
        }
    }
    

    //Agregué este método para complementar el put por id
    async replaceById(idSearch, data) {
        try {
            const result = await knex.from(this.table).where({id : idSearch}).update({data});
            return result;
        }
        catch (error) {
            console.log("error al reemplazar datos: ", error);
            return null;
        }
    }

    async getById(idSearch) {
        try {
            const doc = await knex.from(this.table).where({id : idSearch});
            return doc;
        }
        catch (error) {
            console.log("error al buscar por id: ", error);
        }
    }

    async getAll() {
        try {
            const products = await knex.from(this.table).select('*');
            return products;
        }
        catch (error) {
            console.log("error en getAll): ", error);
            return [];
        }
    }

    async deleteById(idSearch) {
        try {
            const result = await knex.from(this.table).where('id', '=', idSearch).del();
            return result;
        }
        catch (error) {
            console.log("error en deleteById): ", error);
        }
    }

    generateMock () {
        const mocks = [];
        let mock = {};
        for ( let i = 0; i < 5; i++) {
            mock = {
                title: faker.commerce.product(),
                price: faker.commerce.price(),
                thumbnail: faker.image.business()
            }
            mocks.push(mock);
        }
        console.log(mocks)
        return mocks;
    }


}

/* const defTable = (async () => { */
/*     await knex.schema.dropTableIfExists('products'); */
/*     await knex.schema.createTable('products', table => { */
/*         table.increments('id').primary().notNullable(), */
/*         table.string('title',20).notNullable(), */
/*         table.string('description', 100).notNullable(), */
/*         table.string('code',10).notNullable(), */
/*         table.string('thumbnail').notNullable */
/*         table.float('price').notNullable(), */
/*         table.integer('stock').notNullable(), */
/*         table.string('timestamp') */
/*     }); */
/*     console.log("tabla productos creada") */
/* }); */


/* class Products extends Container { */
/*     constructor() { */
/*         super("products"); */
/*     } */
/* }; */
/* const tableProducts = new Products(); */

const tableProducts = new Container('products');

module.exports = tableProducts;

