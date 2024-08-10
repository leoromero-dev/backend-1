import express from 'express';

import { __dirname, hbs } from './utils.js';
import ViewRouters from './routes/viewsRouters.route.js';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import mongoose from 'mongoose';

const app = express();

app.listen(8080, () => {
    console.log('Servidor http listo');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/', ViewRouters);
app.use('/api/products', ProductsRouter);
app.use('/api/carts', CartsRouter);

mongoose.connect('mongodb+srv://leoromero:QOrVKYyuO107QJi7@backend-1.koc7tgh.mongodb.net/?retryWrites=true&w=majority&appName=backend-1', {
    dbName: 'ecommerce'
}).then(() => {
    console.log('Base de datos conectada');
})