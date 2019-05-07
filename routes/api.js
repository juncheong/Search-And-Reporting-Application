const express = require('express');

const apiController = require('../controllers/apiController');

const router = express.Router();

// GET /api/page
router.get('/page', apiController.getPage);

// GET /api/word
router.get('/word', apiController.getWord);

// GET /api/pageWord
router.get('/pageWord/:searchWord/:partialMatch/:caseInsensitive', apiController.getPageWord);

// GET /api/search
router.get('/search', apiController.getSearch);

// POST /api/search
router.post('/search', apiController.postSearch);

// POST /api/indexing
router.post('/indexing', apiController.postIndexing);

module.exports = router;