const request = require('request');

const db = require('../util/db_' + process.env.NODE_ENV);

const Word = require('../models/word');
const Page = require('../models/page');
const Search = require('../models/search');
const pageWord = require('../models/pageWord');

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
            console.log(htmlBody);

            const words = htmlBody.split(/\s+/);
            console.log(words);

            words.forEach(function(parsedWord){
                const word = new Word(null, parsedWord);
                word.save();
            })
    
            res.status(201).json({
                message: 'Indexing successful',
                url: url
            });
        }
    });
}