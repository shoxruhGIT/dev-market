import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/controller.product.js";

const router = express.Router();

router.get("/", getProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
