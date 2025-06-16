const axios = require("axios");

exports.getMoodSuggestion = async (req, res) => {
  try {
    const { input, only } = req.body;

    if (!input) {
      return res.status(400).json({ message: "Input tidak boleh kosong." });
    }

    // Kirim ke FastAPI lokal
    const response = await axios.post("http://127.0.0.1:8000/get_suggestion/", {
      text: input,
    });

    const { mood, suggestion } = response.data;

    // Cek apakah frontend hanya minta mood atau suggestion
    if (only === "mood") {
      return res.json({ mood });
    } else if (only === "suggestion") {
      return res.json({ suggestion });
    } else {
      // Kembalikan keduanya
      return res.json({ mood, suggestion });
    }
  } catch (error) {
    console.error("Error in getMoodSuggestion:", error.message);
    res.status(500).json({ message: "Gagal memanggil AI model lokal." });
  }
};
