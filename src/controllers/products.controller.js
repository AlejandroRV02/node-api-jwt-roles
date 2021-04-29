import Product from '../models/Product';

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json({products})
}

export const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({savedProduct})
}

export const getProductById = async (req, res) => {
    const _id = req.params.id;
    const product = await Product.findById(_id);
    res.status(200).json(product)
}

export const updateProductById = async (req, res) => {
    const _id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(_id, req.body, {new: true});
    res.status(200).json(updatedProduct);
}
export const deleteProductById = async (req, res) => {
    const _id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(_id);
    res.json(deletedProduct);
}