const db = require('../util/db_' + process.env.NODE_ENV);

module.exports = class search {
    constructor(id, terms, count, searchDate, timeToSearch) {
        this.id = id;
        this.terms = terms;
        this.count = count;
        this.searchDate = searchDate;
        this.timeToSearch = timeToSearch;
      }
    
      save() {
        return db.execute(
            'INSERT INTO `search` (terms, count, searchDate, timeToSearch) VALUES (?, ?, ?, ?)',
            [this.terms, this.count, this.searchDate, this.timeToSearch]
        );
      }
    
      static deleteById(id) {
        
      }
    
      static fetchAll() {
        return db.execute('SELECT * FROM `search`');
      }
    
      static findById(id) {
        return db.execute('SELECT * FROM `search` WHERE `searchId` = ?', [id]);  
      }

      static getId(){
          return db.execute('SELECT LAST_INSERT_ID()');
      }
};