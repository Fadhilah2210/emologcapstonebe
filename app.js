const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./src/Routes/authRoutes");
const emotionRouter = require("./src/Routes/emotions"); // route untuk koneksi ke AI

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Untuk parsing body JSON

// Routes
app.use("/api/auth", authRouter);       // endpoint auth (login, register, dll)
app.use("/api/emotion", emotionRouter); // endpoint untuk AI suggestion

// Root endpoint (optional)
app.get("/", (req, res) => {
  res.json({ message: "Emolog API aktif dan berjalan 🚀" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({
    message: "Terjadi kesalahan pada server",
    error: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server Emolog berjalan di http://localhost:${PORT}`);
});
