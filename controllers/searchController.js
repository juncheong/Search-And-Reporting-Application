const path = require('path');
const rootDir = require('../util/path');

const Word = require('../models/word');
const Page = require('../models/page');

exports.getTest = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'test.html'));
}

exports.getFixedList = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'fixedList.html'));
}

exports.getFromFile = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'fromFile.html'));
}

exports.getGoogleAPI = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'googleAPI.html'));
}

exports.getOurSearchEngine = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'ourSearchEngine.html'));
}

exports.getAdminStats = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'adminStats.html'));
}

exports.getAdminIndex = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'adminIndex.html'));
}

exports.getAllWords = (req, res, next) => {
    Word.fetchAll()
        .then((words) => {
            res.send(words[0]);
        })
        .catch(err => console.log(err));
}

exports.postInsertWord = (req, res, next) => {
    const word = req.body.word;
    const insertWord = new Word(null, word);
    insertWord.save()
    .then(() => {
        console.log("Inserted into database");
    })
    .catch(err => console.log(err));
}

exports.getAllPages = (req, res, next) => {
    Page.fetchAll()
        .then((words) => {
            res.send(words[0]);
        })
        .catch(err => console.log(err));
}

exports.postInsertPage = (req, res, next) => {
    const url = req.body.url;
    const descrption = req.body.description;
    const title = req.body.title;
    const lastModified = req.body.lastModified;
    const lastIndexed = req.body.lastIndexed;

    const insertPage = new Page(null, url, descrption, title, lastModified, lastIndexed);
    insertPage.save()
    .then(() => {
        console.log("Inserted into database");
    })
    .catch(err => console.log(err));
}