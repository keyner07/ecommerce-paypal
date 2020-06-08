import { Request, Response } from 'express';
import Product from '../models/product.model';

export async function searchProduct(req: Request, res: Response): Promise<Response> {
    try {
        const category = req.query.category ? { category: req.query.category } : {};
        const searchKeyword = req.query.searchKeyword ? {
            name: {
                $regex: req.query.searchKeyword,
                $options: 'i'
            }
        } : {};
        const sortOrder = req.query.sortOrder ?
        (req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 })
        :
        { _id: -1 };
        const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder);
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ message: 'Occur a problem with the server.' });
    }
}
