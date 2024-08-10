import { Router } from 'express';

import { cartModel } from '../models/carts.model.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    await cartModel.create({});
    res.status(200).json({ message: 'Carrito creado' })
  } catch {
    res.status(500).json({ message: 'Error al crear el carrito' })
  }
})

router.get('/', async (req, res) => {
  try {
    const carts = await cartModel.find();
    res.status(200).json({ carts });
  } catch {
    res.status(500).json({ message: 'Error al obtener los carritos' });
  }
})

router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid).populate('products.product');
    res.status(200).json({ products: cart.products });
  }
  catch (error) {
    if (!cid) return res.status(400).json({ message: 'Falta el ID' });

    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
  }
})

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartModel.findById({ _id: cid });

  const hasProduct = cart.products.some(product => product.product == pid);

  if (hasProduct) {
    cart.products.map(product => product.product == pid && product.quantity++);
  } else {
    cart.products.push({ product: pid });
  }

  try {
    await cartModel.updateOne({ _id: cid }, cart);
    res.status(200).json({ message: 'Producto agregado al carrito' });
  } catch {
    res.status(500).json({ message: 'Error al agregar el producto al carrito' });
  }
})

router.delete('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);
    cart.products = cart.products.filter(product => product.product != pid);

    await cartModel.updateOne({ _id: cid }, cart);
    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch {
    res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
  }
})

router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { body } = req;

  try {
    const cart = await cartModel.findById(cid);
    await body.forEach(element => {
      cart.products.push({ product: element });
    });
    await cartModel.updateOne({ _id: cid }, cart);
    res.status(200).json({ message: 'Carrito actualizado' });
  } catch {
    res.status(500).json({ message: 'Error al actualizar el carrito' });
  }
})

router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { body } = req;

  try {
    const cart = await cartModel.findById(cid);
    const productToUpdate = cart.products.filter(product => product.product == pid)[0];
    productToUpdate.quantity = body.quantity;

    await cartModel.updateOne({ _id: cid }, cart);
    res.status(200).json({ message: 'Producto actualizado' });
  } catch {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
})

router.delete('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartModel.findById(cid);
    cart.products = [];

    await cartModel.updateOne({ _id: cid }, cart);
    res.status(200).json({ message: 'Carrito eliminado' });
  } catch {
    res.status(500).json({ message: 'Error al eliminar el carrito' });
  }
})

export default router;