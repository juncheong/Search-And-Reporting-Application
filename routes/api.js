const express = require('express');

const apiController = require('../controllers/apiController');

const router = express.Router();

// GET /api/pageWord
router.get('/pageWord/:searchWord/:partialMatch/:caseInsensitive', apiController.getPageWord);

// GET /api/search currently gets all searches
router.get('/search', apiController.getAllSearch);

// POST /api/search
router.post('/search', apiController.postSearch);

// POST /api/indexing (crawling)
router.post('/indexing', apiController.postIndexing);

module.exports = router;