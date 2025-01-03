import "./env";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { apiRouter } from "./routes/api";
import { apiKeyMiddleware } from "./middleware/auth";

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiKeyMiddleware);
app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Local server (for development)
if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
}

export default app;
