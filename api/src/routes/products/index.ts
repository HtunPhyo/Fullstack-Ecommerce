import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productsController";

const productsRouter = Router();

productsRouter.get("/", listProducts);

// /123  '123' in this is a path parameter
productsRouter.get("/:id", getProductById); // :id is a parameter , route parameter or path parameter

productsRouter.post("/", createProduct);

productsRouter.put("/:id", updateProduct);

productsRouter.delete("/:id", deleteProduct);

export default productsRouter;
