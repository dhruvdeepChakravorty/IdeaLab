import express, { NextFunction } from "express";
import { Request, Response } from "express";
import authRouter from "./routes/authRoute";
import ideaRouter from "./routes/ideaRoutes";
import versionRouter from "./routes/versionRoute";
import cors from "cors"
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
const app = express();
const globalLimiter = rateLimit({
  windowMs:15*60&1000,
  max:100,
  message:{message:"Too many request"},
  standardHeaders:true,
  legacyHeaders:false
})

app.use(cors({ origin: process.env.CLIENT_URL, credentials:true }))
app.use(cookieParser())
app.use(globalLimiter)
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
