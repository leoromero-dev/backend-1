import { Router } from 'express';

import { __dirname } from '../utils.js';
import CartManager from '../Class/cartManager.js';

const router = Router();

export const cartManager = new CartManager(`${__dirname}/data/carts.json`);

router.post('/', async (req, res) => {
  await cartManager.createCart();
  res.status(200).json({ message: 'Carrito creado' })
})

router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(+cid);

  if (!cid) return res.status(400).json({ message: 'Falta el ID' });

  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

  res.status(200).json({ products: cart.products });
})

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.getCartById(+cid);

  if (!cid || !pid) return res.status(400).json({ message: 'Falta un ID' });

  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

  await cartManager.addProductToCart(+pid, +cid);

  res.status(200).json({ message: 'Producto agregado al carrito' });
})

export default router;