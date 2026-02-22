import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";

/*
Create Product
POST /api/products
*/
export const createProduct = asyncHandler(async (req, res) => {
  const { name, category, type, price, stock, image } = req.body;

  if (!name || !category || !type || !price) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  const product = await Product.create({
    name,
    category,
    type,
    price,
    stock,
    image,
  });

  res.status(201).json(product);
});

/*
Get All Products
GET /api/products
*/
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
  res.status(500).json({ message: error.message });
});

/*
Get Single Product
GET /api/products/:id
*/

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

/*
Update Product
PUT /api/products/:id
*/
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const { name, category, type, price, stock, image } = req.body;

  product.name = name ?? product.name;
  product.category = category ?? product.category;
  product.type = type ?? product.type;
  product.price = price ?? product.price;
  product.stock = stock ?? product.stock;
  product.image = image ?? product.image;

  const updatedProduct = await product.save();

  res.json(updatedProduct);
});

/*
Delete Product
DELETE /api/products/:id
*/
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();

  res.json({ message: "Product removed successfully" });
});
