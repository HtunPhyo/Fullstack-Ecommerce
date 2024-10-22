import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products/index.js";
import authRouter from "./routes/auth/index.js";
import serverless from "serverless-http";

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

if (process.env.NODE_ENV !== "dev") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
