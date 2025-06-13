const db = require("../config/db");

class Emotion {
  /**
   * Mengambil semua data emosi dari database.
   * @returns {Promise<Array>}
   */
  static async findAll() {
    try {
      const result = await db.query(
        "SELECT * FROM tbl_emotions ORDER BY emotion_id ASC"
      );
      return result.rows;
    } catch (error) {
      //
      throw new Error(`Gagal mengambil data emosi: ${error.message}`);
    }
  }
}

module.exports = Emotion;
