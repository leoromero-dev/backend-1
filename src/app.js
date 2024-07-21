import express from 'express';
import { Server } from 'socket.io';

import { __dirname, hbs } from './utils.js';
import ViewRouters from './routes/viewsRouters.route.js';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import ProductManager from './Class/productManager.js';

const productManager = new ProductManager(`${__dirname}/data/products.json`);

const app = express();

const httpServer = app.listen(8080, () => {
    console.log('Servidor http listo');
})

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/', ViewRouters);
app.use('/api/products', ProductsRouter);
app.use('/api/carts', CartsRouter);

io.on('connection', async (socket) => {
    const productList = await productManager.getProductList();
    io.emit('original-product-list', productList);
})