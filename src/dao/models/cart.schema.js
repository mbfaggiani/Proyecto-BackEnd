import mongoose, { Schema } from 'mongoose'

const cartModel = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  products: {
    type: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'products' },
        quantity: { type: Number }
      }
    ],
    default: []
  }
}, { versionKey: false })


export default cartModel 