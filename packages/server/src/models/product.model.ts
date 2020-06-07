import { Schema, model, Document } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, default: 0, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
});

export interface IProduct extends Document {
    _id: Schema.Types.ObjectId,
    name: string,
    image: string,
    brand: string,
    price: number,
    category: string,
    countInStock: number,
    description: string,
    rating: number,
    numReviews: number
}

export default model<IProduct>('Product', productSchema);