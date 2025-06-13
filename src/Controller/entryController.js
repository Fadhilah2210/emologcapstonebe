const Entry = require('../Model/entryModel');

// @desc    Membuat entri baru
// @route   POST /api/entries
// @access  Private
exports.createEntry = async (req, res) => {
    const { emotionId, entryText } = req.body;
    const userId = req.user.userId; 

    if (!emotionId) {
        return res.status(400).json({ message: 'Emotion ID harus diisi.' });
    }

    try {
        const newEntry = await Entry.create({ userId, emotionId, entryText });
        res.status(201).json(newEntry);
    } catch (error) {
        console.error('Create entry error:', error);
        res.status(500).json({ message: 'Gagal membuat entri baru.' });
    }
};

// @desc    Mendapatkan semua entri milik user yang login
// @route   GET /api/entries
// @access  Private
exports.getAllEntries = async (req, res) => {
    const userId = req.user.userId;

    try {
        const entries = await Entry.findAllByUser(userId);
        res.status(200).json(entries);
    } catch (error) {
        console.error('Get all entries error:', error);
        res.status(500).json({ message: 'Gagal mengambil data entri.' });
    }
};

/**
 * @desc    Mendapatkan satu entri berdasarkan ID
 * @route   GET /api/entries/:id
 * @access  Private
 */

exports.getEntryById = async (req, res) => {
    try {
        const entryId = req.params.id;
        const userId = req.user.userId;

        const entry = await Entry.findById({ entryId, userId });

        if (!entry) {
            return res.status(404).json({ message: 'Entri tidak ditemukan atau Anda tidak memiliki akses.' });
        }

        res.status(200).json(entry);
    } catch (error) {
        console.error('Get entry by ID error:', error);
        res.status(500).json({ message: 'Gagal mengambil data entri.' });
    }
};


// @desc    Menghapus sebuah entri
// @route   DELETE /api/entries/:id
// @access  Private
exports.deleteEntry = async (req, res) => {
    const entryId = req.params.id;
    const userId = req.user.userId;

    try {
        const deletedEntry = await Entry.delete({ entryId, userId });
        if (!deletedEntry) {
            // Ini terjadi jika entri tidak ada atau bukan milik user tersebut
            return res.status(404).json({ message: 'Entri tidak ditemukan atau Anda tidak punya akses.' });
        }
        res.status(200).json({ message: 'Entri berhasil dihapus.' });
    } catch (error) {
        console.error('Delete entry error:', error);
        res.status(500).json({ message: 'Gagal menghapus entri.' });
    }
};