import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productsController.js";
import {
  verifySeller,
  verifyToken,
} from "../../../middleware/authMiddleware.js";

const productRouter = Router();
// Apply middlewares to all routes in productsRouter
//productsRouter.use(verifyToken); // apply middleware to all routes

productRouter.get("/", listProducts);

// /123  '123' in this is a path parameter
productRouter.get("/:id", getProductById); // :id is a parameter , route parameter or path parameter

//can put middleware in there if you just want to this route, if so u need to delete all routes apply
//productsRouter.post("/", verifyToken, verifySeller, createProduct);
productRouter.post("/", verifyToken, createProduct);

productRouter.put("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
