import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import productsRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev")); // request logging

app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

app.use("/api", productsRoutes);
app.use("/api", userRoutes);

try {
  await mongoose.connect(process.env.DB_URI);
  console.log("MongoDB connected successfully");

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("MongoDB connection error:", error);
  process.exit(1);
}
