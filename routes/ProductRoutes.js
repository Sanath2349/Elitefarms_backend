import express from "express";
import Product from "../models/Product.js";

const router = express.Router();
/*
POST /api/products
Create a new product
*/
router.post("/", async (req, res) => {
  try {
    const { name, category, type, price, stock, image } = req.body;

    const product = await Product.create({
      name,
      category,
      type,
      price,
      stock,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/*
GET /api/products
Fetch all products
*/
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
