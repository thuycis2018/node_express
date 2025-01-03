import { Request, Response, NextFunction } from "express";

export const apiKeyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const apiKey = req.header("apiKey");

  const validApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    res.status(401).json({ error: "Unauthorized: Invalid API key" });
    return;
  }

  next();
};
