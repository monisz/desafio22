const express = require('express');
const router = express.Router();
const tableProducts = require('../containers/productContainer_mysql');
const { faker } = require('@faker-js/faker');
faker.locale = "es";

//const tableProducts = new Container('products');

const admin = true;
const isAdmin = (req, res, next) => {
    if (admin === true ) next();
    else res.status(403).send("método no autorizado");
};


//Vista de todos los productos
router.get('/', (req, res) => {
    const getProducts = (async () => {
        const products = await tableProducts.getAll();
        res.render('main-products', {products});
    }) ();
});

//Para agregar un producto
/* router.post('/', isAdmin, (req, res) => { */
/*     const newProduct = req.body; */
/*     newProduct.timestamp = Date.now(); */
/*     console.log(newProduct) */
/*     const saveProduct = (async () => { */
/*         const allProducts = await tableProducts.save(newProduct); */
/*     }) (); */
/*     res.redirect('/'); */
/* }); */

//Ruta para test con Faker
router.get('/test', async (req, res) => {
    const mocks = await tableProducts.generateMock();
    console.log(mocks)
    res.render('main-faker', {mocks})
});

module.exports = router;

