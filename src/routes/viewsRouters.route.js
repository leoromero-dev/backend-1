import { Router } from "express";

import { __dirname } from '../utils.js';
import ProductManager from '../Class/productManager.js';

const productManager = new ProductManager(`${__dirname}/data/products.json`);

const app = Router();

app.get('/', async (req, res) => {
  const productList = await productManager.getProductList();
  res.render('home', {
    products: productList
  })
})

app.get('/realtimeproducts', async (req, res) => { 
  res.render('realtimeproducts', {});
})

export default app
