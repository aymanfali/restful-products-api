// index.js
const express = require("express");
const app = express();
const productsRoutes = require("./routes/productsRoutes"); // Import the router

const PORT = 3000;

app.use(express.json());

app.use("/api", productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
