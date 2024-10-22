import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    // decode jwt toke data
    const decoded = jwt.verify(token, "your_jwt_secret");
    console.log(decoded);
    if (typeof decoded !== "object" || !decoded?.id) {
      res.status(401).json({ error: "Access denied" });
      return;
    }

    // attach userId and role to request
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (e) {
    res.status(401).json({ error: "Access denied" });
  }
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
  const role = req.role;
  if (role !== "seller") {
    res.status(401).json({ error: "Access denied" });
    return;
  }
  next();
}
