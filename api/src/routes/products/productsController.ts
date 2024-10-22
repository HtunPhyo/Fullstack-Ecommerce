import { Request, Response } from "express";
import { db } from "../../db";
import { productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function createProduct(req: Request, res: Response) {
  console.log(req.userId);
  const { name, description, image, price } = req.body;

  //Validate 'name' and 'price' are present and valid
  if (typeof name !== "string" || name.length === 0 || name.length > 255) {
    res.status(400).json({
      error: "'name' must be a non-empty string of max 255 characters",
    });
  }

  if (typeof price !== "number" || isNaN(price) || price < 0) {
    res.status(400).json({ error: "'price' must be a valid number" });
  }

  // Validate 'description' and 'image' if they exist
  if (description && typeof description !== "string") {
    res.status(400).json({ error: "'description' must be a string" });
  }

  if (image && (typeof image !== "string" || image.length > 255)) {
    res
      .status(400)
      .json({ error: "'image' must be a string of max 255 characters" });
  }
  try {
    const { name, price } = req.body;
    //returning give us an arry so we need to destructure
    const [product] = await db
      .insert(productsTable)
      .values({ name, description, image, price })
      .returning();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.body;
    const [updatedItem] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [deletedItem] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();
    if (deletedItem) {
      res.status(204).json(deletedItem);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
