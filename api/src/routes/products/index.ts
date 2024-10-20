import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  res.send("list of products");
});

productsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send("single product " + id);
});

export default productsRouter;
