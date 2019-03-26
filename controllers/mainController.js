const path = require('path');

const rootDir = require('../util/path');


exports.getIndex = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'index.html'));
}

exports.getBrowser = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'browser.html'));
}

exports.getContactUs = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contactUs.html'));
}

exports.getDevDescriptions = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'dev_descriptions.html'));
}

exports.getFixedList = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'fixedList.html'));
}

exports.getGeolocation = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'geolocation.html'));
}

exports.getLocation = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'location.html'));
}

exports.getScreen = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'screen.html'));
}

exports.getWindow = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'window.html'));
}

exports.getFromFile = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'fromFile.html'));
}

exports.getGoogleAPI =  (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'googleAPI.html'));
}

exports.getOurSearchEngine = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'ourSearchEngine.html'));
}