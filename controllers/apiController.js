const db = require('../util/db_' + process.env.NODE_ENV);

const Word = require('../models/word');
const Page = require('../models/page');
const Search = require('../models/search');
const pageWord = require('../models/pageWord');

exports.getPage = (req, res, next) => {
    res.status(200).json({
        //JSON data to pass back here
    });
};

exports.getWord = (req, res, next) => {
    res.status(200).json({
        //JSON data to pass back here
    });
};

exports.getPageWord = (req, res, next) => {
    // /pageWord/:searchWord/:partialMatch/:caseInensitive

    const searchWord = req.params.searchWord;
    const partialMatch = req.params.partialMatch;
    const caseInsensitive = req.params.caseInsensitive;

    let query = 
    "SELECT * FROM `page`, `word`, `page_word` " + 
    "WHERE `page.pageId` = `page_word.pageId` " +
    "AND `word.wordId` = `page_word.wordId` ";

    if (partialMatch && caseInsensitive) {
        query += "AND UPPER(`word.wordName`) LIKE UPPER(`%" + searchWord + "%`) ";
    }
    else if (caseInsensitive) {
        query += "AND UPPER(`word.wordName`) = UPPER(" + searchWord + ") ";
    }
    else if (partialMatch) {
        query += "AND `word.wordName` LIKE `%" + searchWord + "%` ";
    }
    else {
        query += "AND `word.wordName` = " + searchWord + " ";
    }

    query += "ORDER BY `freq`";

    db.execute(query);

    res.status(200).json({
        //JSON data to pass back here
    });
};

exports.getSearch = (req, res, next) => {
    res.status(200).json({
        //JSON data to pass back here
    });
};

exports.postSearch = (req, res, next) => {
    const terms = req.body.terms;
    const count = req.body.count;
    const searchDate = req.body.searchDate;
    const timeToSearch = req.body.timeToSearch;

    const search = new Search(null, terms, count, searchDate, timeToSearch);
    search.save();
    const insertedSearchId = Search.getId();
    search.id = insertedSearchId;

    res.status(201).json({
        message: 'Search inserted successfully',
        post: search
    });
}

exports.postIndexing = (req, res, next) => {
    const url = req.body.url;

    
}