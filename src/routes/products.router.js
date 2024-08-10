import { Router } from 'express';

import { productModel } from '../models/products.model.js';

const router = Router();

router.get('/', async (req, res) => {
  const options = {
    limit: parseInt(req.query.limit) || 10,
    page: parseInt(req.query.page) || 1,
    sort: { price: req.query.sort || 1 }
  }
  let searchParams = {};

  if (req.query.category) {
    searchParams.category = req.query.category;
  }

  if (req.query.status) {
    searchParams.status = req.query.status;
  }

  try {
    const data = await productModel.paginate(searchParams, options)
    const { totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = data;
    const prevLink = hasPrevPage ? `/?page=${prevPage}&limit=${options.limit}` : null;
    const nextLink = hasNextPage ? `/?page=${nextPage}&limit=${options.limit}` : null;
    res.status(200).json({
      status: 'success',
      payload: data.docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  };
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);
    return res.status(200).json({ product });
  } catch {
    return res.status(500).json({ message: 'Error al obtener el producto' });
  }
})

router.post('/', async (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnail } = req.body;

  if (!title || !description || !code || !price || !status || !stock || !category) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const isDuplicated = await productModel.findOne({ title });

  if (isDuplicated) {
    return res.status(400).json({ message: 'Ya existe un producto con ese nombre' });
  }

  try {
    await productModel.create({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail: thumbnail || ''
    });
    res.status(201).json({ message: 'Producto creado' })
  } catch {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
})

router.put('/:id', async (req, res) => {
  const { body, params: { id } } = req;
  const productExists = await productModel.find({ id });

  if (!productExists || !id) {
    res.status(400).json({ message: 'Ingrese un ID válido' })
  }

  try {
    await productModel.findByIdAndUpdate(id, { ...body });
    res.status(200).json({ message: 'Producto actualizado' })
  } catch {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const productExists = await productModel.findById(id);

  if (!productExists || !id) {
    res.status(400).json({ message: 'Ingrese un ID válido' })
  }

  try {
    await productModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Producto eliminado' })
  } catch {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
})

export default router;