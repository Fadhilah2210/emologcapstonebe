const express = require('express');
const router = express.Router();
const entryController = require('../Controller/entryController');
const { protect } = require('../middleware/authMiddleware');

const { 
    createEntry, 
    getAllEntries, 
    deleteEntry, 
    getEntryById 
} = require('../Controller/entryController');


router.use(protect);

// Definisi rute
router.route('/')
    .get(entryController.getAllEntries)
    .post(entryController.createEntry);

router.route('/:id')
    .get(entryController.getEntryById) 
    .delete(entryController.deleteEntry);
    
module.exports = router;