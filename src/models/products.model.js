import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 250 },
  code: { type: String, required: true, max: 14 },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: false },
});

productSchema.plugin(mongoosePaginate);

export const productModel = model('products', productSchema);
