import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
  },
});

cartSchema.plugin(mongoosePaginate);

export const cartModel = model('carts', cartSchema);
