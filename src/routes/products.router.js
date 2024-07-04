import { Router } from 'express';

import { __dirname } from '../utils.js';
import ProductManager from '../Class/productManager.js';

const router = Router();

const productManager = new ProductManager(`${__dirname}/data/products.json`);

router.get('/', async (req, res) => {
  const productList = await productManager.getProductList();
  res.status(200).json({ products: productList });
})

router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(+pid);

  if (!pid) {
    return res.status(400).json({ message: 'Falta el ID' });
  }

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  return res.status(200).json({ product });
})

router.post('/', async (req, res) => {
  const productList = await productManager.getProductList();
  const { title, description, code, price, status, stock, category, thumbnail } = req.body;

  if (!title || !description || !code || !price || !status || !stock || !category) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  await productManager.addProduct({
    id: productList.length + 1,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail: thumbnail || ''
  })

  res.status(201).json({ message: 'Producto creado' })
})

router.put('/:pid', async (req, res) => {
  const { body, params: { pid } } = req;
  const productExists = await productManager.getProductById(+pid);

  if (!productExists || !pid) {
    res.status(400).json({ message: 'Ingrese un ID válido' })
  }

  await productManager.updateProduct({
    id: +pid,
    ...body
  })

  res.status(200).json({ message: 'Producto actualizado' })
})

router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  const productExists = await productManager.getProductById(+pid);

  if (!productExists || !pid) {
    res.status(400).json({ message: 'Ingrese un ID válido' })
  }

  productManager.deleteProductById(+pid);

  res.status(200).json({ message: 'Producto eliminado' })
})

export default router;