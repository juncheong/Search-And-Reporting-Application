const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'index.html'));
});

router.get('/index.html', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'index.html'));
});

router.get('/browser.html', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'browser.html'));
});

router.get('/contactUs.html', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contactUs.html'));
});

router.get('/dev_descriptions.html', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'dev_descriptions.html'));
});

router.get('/fixedList.html', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'fixedList.html'));
});

router.get('/geolocation.html', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'geolocation.html'));
});

router.get('/location.html', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'location.html'));
});

router.get('/screen.html', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'screen.html'));
});

router.get('/window.html', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'window.html'));
});

router.get('/fromFile.html', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'fromFile.html'));
});

router.get('/googleAPI.html', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'googleAPI.html'));
});

router.get('/ourSearchEngine.html', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'ourSearchEngine.html'));
});


module.exports = router;