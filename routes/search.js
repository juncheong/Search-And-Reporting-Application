const express = require('express');

const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/fixedList.html', searchController.getFixedList);

router.get('/fromFile.html', searchController.getFromFile);

router.get('/googleAPI.html', searchController.getGoogleAPI);

router.get('/ourSearchEngine.html', searchController.getOurSearchEngine);

router.get('/getAllWords', searchController.getAllWords);

router.post('/insertWord', searchController.postInsertWord);

router.get('/getAllPages', searchController.getAllPages);

router.post('/insertPage', searchController.postInsertPage);

router.get('/test.html', searchController.getTest);

router.get('/adminIndex.html', searchController.getAdminIndex);

router.get('/adminStats.html', searchController.getAdminStats);



module.exports = router;