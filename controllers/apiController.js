const request = require('request');

const db = require('../util/db_' + process.env.NODE_ENV);

const Word = require('../models/word');
const Page = require('../models/page');
const Search = require('../models/search');
const PageWord = require('../models/pageWord');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.getPageWord = (req, res, next) => {
    // /pageWord/:searchWord/:partialMatch/:caseInsensitive

    let searchWord = req.params.searchWord;
    let partialMatch = req.params.partialMatch;
    let caseInsensitive = req.params.caseInsensitive;

    let query = 
    "SELECT * FROM page, word, page_word " + 
    "WHERE page.pageId = page_word.pageId " +
    "AND word.wordId = page_word.wordId ";

    if (partialMatch == "true" && caseInsensitive == "true") {
        query += "AND UPPER(word.wordName) LIKE UPPER('%" + searchWord + "%') ";
    }
    else if (partialMatch == "false" && caseInsensitive == "true") {
        query += "AND UPPER(word.wordName) = UPPER('" + searchWord + "') ";
    }
    else if (partialMatch == "true" && caseInsensitive == "false") {
        query += "AND BINARY word.wordName LIKE '%" + searchWord + "%' ";
    }
    else {
        query += "AND BINARY word.wordName = '" + searchWord + "' ";
    }

    query += "ORDER BY freq";

    let queryResult = db.execute(query);

    queryResult.then(function(results) {
        res.status(200).json({
            result: results[0], 
            queryData: [{
                searchWord: searchWord,
                partialMatch: partialMatch,
                caseInsensitive: caseInsensitive
            }]
        });
    })
};

exports.getAllSearch = (req, res, next) => {
    Search.fetchAll()
    .then((results) => {
        res.send(results[0]);
    })
    .catch(err => console.log(err));
};

exports.postSearch = (req, res, next) => {
    const terms = req.body.terms;
    const count = req.body.count;
    const searchDate = req.body.searchDate;
    const timeToSearch = req.body.timeToSearch;

    const search = new Search(null, terms, count, searchDate, timeToSearch);
    search.save();

    res.status(201).json({
        message: 'Search inserted successfully',
        post: search
    });
}

exports.postIndexing = (req, res, next) => {
    const url = req.body.url;

    const startTime = new Date();

    request(url, function (err, reqRes, body) {
        if(err) {
            console.log(err, "error occured while hitting URL");

            res.status(502).json({
                message: 'Indexing unsuccessful',
                url: url
            });
        }
        else {
            const htmlBody = body;
            const frag = JSDOM.fragment(JSON.stringify(htmlBody));

            const endTime = new Date();
            const words = htmlBody.split(/\s+/);

            let title = null;
            if (frag.querySelector("title") != null){
                title = frag.querySelector("title").textContent;
            }
            
            let description = null;
            if (frag.querySelector("description") != null){
                description = frag.querySelector("description").textContent;
            }

            const timeToIndex = endTime - startTime;

            insertPageAndGetId(url, title, description, timeToIndex, startTime, words, processWordsAndUpload);

            res.status(200).json({
                message: 'Request received',
                url: url
            });

        }
    });
}

function insertPageAndGetId(url, title, description, timeToIndex, startTime, words, callback){

    let pageId = Page.findIdByUrl(url);
    pageId.then(function(result) {
        const firstObj = result[0];
        if (firstObj[0] == null) {
            const page = new Page(null, url, title, description, startTime, startTime, timeToIndex);
            page.save().then(function(unusedResult) {
                const insertedPageId = Page.getMaxId();
                insertedPageId.then(function(result) {
                    const resultJson = result[0];
                    const idJson = resultJson[0];
                    callback(idJson["max(pageId)"], words);
                });
            });
        }
        else {
            const page = new Page(firstObj[0].pageId, url, title, description, null, startTime, timeToIndex);
            page.update();
            callback(firstObj[0].pageId, words);
        }
    });
}

function processWordsAndUpload(pageId, words){
    
    const wordMap = new Map();
    words.forEach(function (parsedWord){
        if (wordMap.has(parsedWord)){
            wordMap.set(parsedWord, (wordMap.get(parsedWord)) + 1);
        }
        else {
            wordMap.set(parsedWord, 1);
        }
    });

    wordMap.forEach(function(value, key, map){
        let word = new Word(null, key);
        word.save().then(function(unusedResult) {
            let wordIdByName = Word.findByWordName(key);
            wordIdByName.then(function(resultIdbyName) {
                let resultIdbyNameJson = resultIdbyName[0];
                let idByNameJson = resultIdbyNameJson[0];
                let pageWord = new PageWord(null, pageId, idByNameJson["wordId"], value);
                pageWord.save().then(function(anotherUnusedResult) {/* here just as a callback to wait */});
            });
        });
    });
}