import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/userSchema.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { email, password, userName } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  if (!email || !password || !userName) {
    res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const [user] = await db
      .insert(usersTable)
      .values({ email, password: hashedPassword, name: userName })
      .returning();

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password" });
    }

    // create jwt token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "your_jwt_secret",
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default authRouter;
