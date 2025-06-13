// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../config/db"); // pakai config/db.js kamu

// GET /api/auth/profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const username = req.user.username;

    const query = "SELECT username, email, fullname FROM users WHERE username = $1";
    const result = await db.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const user = result.rows[0];
    res.json(user);

  } catch (error) {
    console.error("Error ambil profile:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

module.exports = router;
