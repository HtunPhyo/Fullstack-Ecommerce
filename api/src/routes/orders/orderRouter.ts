import { Router } from "express";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "./orderController.js";

import { verifyToken } from "../../../middleware/authMiddleware.js";

const orderRouter = Router();

orderRouter.post(
  "/",
  verifyToken,

  createOrder
);

orderRouter.get("/", verifyToken, listOrders);
orderRouter.get("/:id", verifyToken, getOrder);
orderRouter.put("/:id", verifyToken, updateOrder);

export default orderRouter;
