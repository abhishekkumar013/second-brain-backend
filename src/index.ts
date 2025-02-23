import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import UserRoutes from "./routes/user.routes.ts";
import ContenRoutes from "./routes/content.routes.ts";
import BrainRoutes from "./routes/brain.routes.ts";
import TagRoutes from "./routes/tag.routes.ts";
import { errorMiddleware } from "./utils/errorHandler.ts";
import connectDB from "./db/index.ts";

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/content", ContenRoutes);
app.use("/api/v1/brain", BrainRoutes);
app.use("/api/v1/tag", TagRoutes);

connectDB()
  .then(() => {
    app.listen(5050, () => {
      console.log("Server is running on port 5050");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
    process.exit(1);
  });

app.use(errorMiddleware);
