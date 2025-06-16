// src/Routes/emotions.js
const express = require("express");
const router = express.Router();
const emotionController = require("../Controller/emotionController");

// Gunakan controller untuk handle /suggest
router.post("/suggest", emotionController.getMoodSuggestion);

module.exports = router;
