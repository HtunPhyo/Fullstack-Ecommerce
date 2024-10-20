import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
  res.send("list of products");
}

export function getProductById(req: Request, res: Response) {
  const { id } = req.params;
  res.send("product with id " + id);
}

export function createProduct(req: Request, res: Response) {
  const { body } = req;
  console.log(body);
  res.send("created product");
}

export function updateProduct(req: Request, res: Response) {
  res.send("updated product");
}

export function deleteProduct(req: Request, res: Response) {
  res.send("deleted product");
}
