import "./env";
import express, { Application } from "express";
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { apiRouter } from "./routes/api";

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
