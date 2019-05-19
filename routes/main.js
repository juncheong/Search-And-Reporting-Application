const express = require('express');

const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.getIndex);

router.get('/index.html', mainController.getIndex);

router.get('/browser.html', mainController.getBrowser);

router.get('/contactUs.html', mainController.getContactUs);

router.get('/devDescriptions.html', mainController.getDevDescriptions);

router.get('/geolocation.html', mainController.getGeolocation);

router.get('/location.html', mainController.getLocation);

router.get('/screen.html', mainController.getScreen);

router.get('/window.html', mainController.getWindow);

router.get('/adminIndex.html', mainController.getAdminIndex);

router.get('/adminStats.html', mainController.getAdminStats);


module.exports = router;