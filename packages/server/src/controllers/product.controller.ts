/* eslint-disable @typescript-eslint/ban-ts-comment */
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

export async function getProduct(req: Request, res: Response): Promise<Response> {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            return res.status(200).json(product);
        }
        else {
            return res.status(400).json({ message: 'Product not found.' });
        }
    } catch (err) {
        return res.status(500).json({ message: "Occur a problem with the server." });
    }
}

export async function updateProduct(req: Request, res: Response): Promise<Response> {
    try {
        // @ts-ignore
        if (req.user?.isAdmin) {
            return res.status(400).json({ message: 'Unauthorized.' });
        }
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.brand = req.body.brand;
            product.category = req.body.category;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            const productUpdate = await product.save();
            if (productUpdate) {
                return res.status(200).json({ message: 'Product updated', productUpdate});
            }
        }
        return res.status(500).json({ message: 'Error in updating product.'});
        } catch (err) {
            return res.status(500).json({ message: 'Occur a problem with the server.' });
        }
}

export async function createProduct(req: Request, res: Response): Promise<Response> {
    try {
        // @ts-ignore
        if (req.user?.isAdmin) {
            return res.status(400).json({ message: 'Unauthorized.' });
        }
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            brand: req.body.brand,
            category: req.body.category,
            countInStock: req.body.countInStock,
            description: req.body.description,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
        });
        const newProduct = await product.save();
        if (newProduct) {
            return res.status(201).json(newProduct);
        }
        return res.status(400).json({ message: 'Occur a problem with the data.' });
    } catch (err) {
        return res.status(500).json({ message: 'Occur a problem with the server.' });
    }
}

export async function deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
        // @ts-ignore
        if (req.user?.isAdmin) {
            return res.status(400).json({ message: 'Unauthorized.' });
        }
        const productDelete = await Product.findById(req.params.id);
        if (productDelete) {
            await productDelete.remove();
            return res.status(200).json(({ message: 'Product deleted.' }));
        }
        return res.status(400).json({ message: 'Product not found.' });
    } catch (err) {
        return res.status(500).json({ message: 'Occur a problem with the server.' });
    }
}