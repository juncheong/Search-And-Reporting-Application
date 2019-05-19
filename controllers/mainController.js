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
    res.sendFile(path.join(rootDir, 'views', 'devDescriptions.html'));
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

exports.getAdminStats = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'adminStats.html'));
}

exports.getAdminIndex = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'adminIndex.html'));
}