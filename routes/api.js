const express = require('express');

const apiController = require('../controllers/apiController');

const router = express.Router();

// GET /api/page
router.get('/page', apiController.getPage);

// GET /api/word
router.get('/word', apiController.getWord);

// GET /api/search
router.get('/search', apiController.getSearch);

// POST /api/search
router.post('/search', apiController.postSearch);

module.exports = router;