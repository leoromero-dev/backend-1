import { Router } from "express";

import { productModel } from '../models/products.model.js';
import { cartModel } from '../models/carts.model.js';

const app = Router();

app.get('/', async (req, res) => {
  const options = {
    limit: parseInt(req.query.limit) || 5,
    page: parseInt(req.query.page) || 1,
    sort: { price: req.query.sort || 1 }
  }

  await productModel.paginate({}, options).then((data) => {
    res.render('home', {
      products: data.docs.map((product) => product.toJSON()),
      totalPages: data.totalPages,
      currentPage: data.page,
      limit: options.limit
    });
  });
})

app.get('/cart', async (req, res) => {
  await cartModel.findById('66b3aa40659a6d2ef63dd8fb').populate('products.product')
    .then((cart) => {
      res.render('cart', {
        products: cart.products.map((product) => product.product.toJSON()),
      });
    });
})

export default app
