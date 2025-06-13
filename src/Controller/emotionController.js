// src/Controller/emotionController.js
const yourAIModel = require("../path/to/your/ai/model"); // Ganti dengan path ke model AI Anda

exports.getMoodSuggestion = async (req, res) => {
  try {
    const { input } = req.body; // Ambil input dari body request
    if (!input) {
      return res.status(400).json({ message: "Input tidak boleh kosong." });
    }

    // Panggil model AI Anda di sini
    const result = await yourAIModel.predict(input); // Ganti dengan logika model AI Anda

    res.json(result);
  } catch (error) {
    console.error("Error in getMoodSuggestion:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat memproses permintaan." });
  }
};
