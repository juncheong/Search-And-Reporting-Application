exports.getPage = (req, res, next) => {
    res.status(/* some HTTP status code here */).json({
        //JSON data to pass back here
    });
};

exports.getWord = (req, res, next) => {
    res.status(/* some HTTP status code here */).json({
        //JSON data to pass back here
    });
};

exports.getSearch = (req, res, next) => {
    res.status(/* some HTTP status code here */).json({
        //JSON data to pass back here
    });
};

exports.postSearch = (req, res, next) => {
    const terms = req.body.terms;
    const count = req.body.count;
    const searchDate = req.body.searchDate;
    const timeToSearch = req.body.timeToSearch;

    res.status(201).json({
        
    });
}
/*

these for page_word table might not be necessary?
should insert into page_word as soon as a page & word combination inserted

exports.getPageWord = (req, res, next) => {
    res.status(/* some HTTP status code here *).json({
        //JSON data to pass back here
    });
};

exports.postPageWord = (req, res, next) => {
    //const url = req.body.url
    //const title = req.body.title
    //some examples above

    res.json({
        
    });
}
*/
