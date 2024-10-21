import {
  pgTable,
  unique,
  integer,
  varchar,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { desc, sql } from "drizzle-orm";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});
