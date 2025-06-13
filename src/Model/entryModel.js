const db = require('../Config/db');

class Entry{

    static async create({ userId, emotionId, entryText }) {
        const result = await db.query(
            'INSERT INTO tbl_entries (user_id, emotion_id, entry_text, entry_date) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [userId, emotionId, entryText]
        );
        return result.rows[0];
    }

    static async findAllByUser (userId) {
        const result = await db.query(
            'SELECT * FROM tbl_entries WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        return result.rows;
    }

    static async findById({ entryId, userId }) { 
        const result = await db.query(
            'SELECT * FROM tbl_entries WHERE entry_id = $1 AND user_id = $2',
            [entryId, userId] 
        );
        return result.rows[0];
    }

    static async delete (entryId, userId) {
        const result = await db.query(
            'DELETE FROM tbl_entries WHERE entry_id = $1 AND user_id = $2 RETURNING entry_id',
            [entryId, userId]
        );
        return result.rows[0];
    }
}

module.exports = Entry;