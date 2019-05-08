const request = require('request');

const db = require('../util/db_' + process.env.NODE_ENV);

const Word = require('../models/word');
const Page = require('../models/page');
const Search = require('../models/search');
const PageWord = require('../models/pageWord');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.getPageWord = (req, res, next) => {
    // /pageWord/:searchWord/:partialMatch/:caseInensitive

    const searchWord = req.params.searchWord;
    const partialMatch = req.params.partialMatch;
    const caseInsensitive = req.params.caseInsensitive;

    let query = 
    "SELECT * FROM page, word, page_word " + 
    "WHERE page.pageId = page_word.pageId " +
    "AND word.wordId = page_word.wordId ";

    if (partialMatch && caseInsensitive) {
        query += "AND UPPER(word.wordName) LIKE UPPER('%" + searchWord + "%') ";
    }
    else if (caseInsensitive) {
        query += "AND UPPER(word.wordName) = UPPER(" + searchWord + ") ";
    }
    else if (partialMatch) {
        query += "AND word.wordName LIKE '%" + searchWord + "%' ";
    }
    else {
        query += "AND word.wordName = " + searchWord + " ";
    }

    query += "ORDER BY freq";

    const queryResult = db.execute(query);

    res.status(200).json({
        result: queryResult, 
        queryData: [{
            searchWord: searchWord,
            partialMatch: partialMatch,
            caseInsensitive: caseInsensitive
        }]
    });
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

            let title = null;
            if (frag.querySelector("title") != null){
                title = frag.querySelector("title").textContent;
            }
            
            let description = null;
            if (frag.querySelector("description") != null){
                description = frag.querySelector("description").textContent;
            }

            const timeToIndex = endTime - startTime;

            let pageId = Page.findIdByUrl(url);
            pageId.then(function(result) {
                const firstObj = result[0];
                if (firstObj[0] == null) {
                    //id, url, title, description, lastModified, lastIndexed, timeToIndex
                    const page = new Page(null, url, title, description, startTime, startTime, timeToIndex);
                    page.save();
                    pageId = Page.getLastInsertId();
                    console.log(pageId);
                }
                else {
                    console.log(firstObj[0].pageId);
                    const page = new Page(firstObj[0].pageId, url, title, description, null, startTime, timeToIndex);

                    //complete update function to simply update the lastIndexed
                    page.update();

                    
                }

                const words = htmlBody.split(/\s+/);

                //add words to a map to calculate frequency
                const wordMap = new Map();
                words.forEach(function (parsedWord){
                    if (wordMap.has(parsedWord)){
                        wordMap.set(parsedWord, wordMap.get(parsedWord) + 1);
                    }
                    else {
                        wordMap.set(parsedWord, 1);
                    }
                });

                wordMap.forEach(function(value, key, map){
                    let word = new Word(null, key);
                    word.save();
                    let wordId = Word.getLastInsertId();
                    let pageWord = new PageWord(null, pageId, wordId, value);
                    pageWord.save();
                });
            });

    
            res.status(201).json({
                message: 'Indexing successful',
                url: url
            });
        }
    });
}