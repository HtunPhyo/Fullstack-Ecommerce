import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products";
import authRouter from "./routes/auth";

const app = express();

app.use(json()); // use json middleware, view data from body

app.use(urlencoded({ extended: false })); // don't no why add this

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// use products router
app.use("/products", productsRouter);

// use auth router
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
