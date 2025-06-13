// src/Routes/emotions.js
const express = require("express");
const router = express.Router();

// Contoh endpoint untuk mendapatkan emosi
router.post("/suggest", async (req, res) => {
  try {
    const { input } = req.body; // Ambil input dari body request
    // Panggil model AI Anda di sini
    const result = await yourAIModel.predict(input); // Ganti dengan logika model AI Anda
    res.json(result);
  } catch (error) {
    console.error("Error in emotion route:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat memproses permintaan." });
  }
});

module.exports = router;
