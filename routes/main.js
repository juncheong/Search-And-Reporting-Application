const express = require('express');

const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.getIndex);

router.get('/index.html', mainController.getIndex);

router.get('/browser.html', mainController.getBrowser);

router.get('/contactUs.html', mainController.getContactUs);

router.get('/dev_descriptions.html', mainController.getDevDescriptions);

router.get('/fixedList.html', mainController.getFixedList);

router.get('/geolocation.html', mainController.getGeolocation);

router.get('/location.html', mainController.getLocation);

router.get('/screen.html', mainController.getScreen);

router.get('/window.html', mainController.getWindow);

router.get('/fromFile.html', mainController.getFromFile);

router.get('/googleAPI.html', mainController.getGoogleAPI);

router.get('/ourSearchEngine.html', mainController.getOurSearchEngine);


module.exports = router;