import express, { NextFunction } from "express";
import { Request, Response } from "express";
import authRouter from "./routes/authRoute";
import ideaRouter from "./routes/ideaRoutes";
import versionRouter from "./routes/versionRoute";
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ message: "Health Okay" });
});

app.use("/api/auth", authRouter);
app.use("/api/ideas", ideaRouter);
app.use("/api/ideas/:ideaId/versions", versionRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ message: err.message });
});

export default app;
