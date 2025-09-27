import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import productsRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Logger
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api", productsRoutes);
app.use("/api/auth", userRoutes);

// Create HTTP server and attach Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Make io accessible in other files (controllers, etc.)
export { io };

// Chat system
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Send welcome
  socket.emit("welcome", { message: "Welcome to Socket.IO server 🚀" });

  // Chat event
  socket.on("chatMessage", (msg) => {
    console.log(`Message from ${socket.id}: ${msg}`);
    io.emit("chatMessage", msg); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Connect to DB and start server
try {
  await mongoose.connect(process.env.DB_URI);
  console.log("MongoDB connected successfully");

  httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("MongoDB connection error:", error);
  process.exit(1);
}
