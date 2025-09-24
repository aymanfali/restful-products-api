const express = require("express");
const app = express();
const productsRoutes = require("./routes/productsRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");

const PORT = 3000;
dotenv.config();

app.use(express.json());

app.use("/api", productsRoutes);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

app.use(morgan("dev"));

app.use((req, res, next) => {
  const now = new Date().toString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
