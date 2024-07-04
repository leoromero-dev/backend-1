import express from 'express';

import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', ProductsRouter);
app.use('/api/carts', CartsRouter);

app.listen(8080, () => {
  console.log('Servidor listo')
})