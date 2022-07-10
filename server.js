const express = require('express');
const { engine } = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const apiRoutes = require('./src/routes')
const tableProducts = require('./src/containers/productContainer_mysql');
const colMessages = require('./src/containers/messagesContainer_firebase');

const app = express();
const httpServer = new HttpServer(app);
const ioServer = new SocketServer(httpServer);
        
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      defaultLayout: 'index.hbs',
    })
);

app.set('views', './public/views');
app.set('view engine', 'hbs');

app.use('/', apiRoutes);

//Ruta para test con Faker
app.get('/api/productos-test', async (req, res) => {
    const mocks = await tableProducts.generateMock();
    console.log(mocks)
    res.render('main-faker', {mocks})
})

// Para cualquier ruta no implementada
app.use((req, res) => {
    res.status(404).send("ruta no implementada");
});


httpServer.listen(8080, () => {
    console.log("escuchando desafio 22");
});


ioServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    const getTables = (async () => {
        socket.emit('messages', await colMessages.getAll());  
        socket.emit('products', await tableProducts.getAll());
    }) ();

    socket.on("newMessage", (message) => {
        const saveMessage = (async (message) => {
            const messagesNorm = await colMessages.save(message);
            ioServer.sockets.emit("messages", messagesNorm);
        }) (message);
    });
    socket.on('newProduct', (product) => {
        const getProducts = (async (product) => {
            await tableProducts.save(product);
            const allProducts = await tableProducts.getAll()
            ioServer.sockets.emit("products", allProducts);
        }) (product);
    });
});
