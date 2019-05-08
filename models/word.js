const db = require('../util/db_' + process.env.NODE_ENV);

module.exports = class word {
    constructor(id, wordName) {
        this.id = id;
        this.wordName = wordName;
      }
    
      save() {
        return db.execute('INSERT IGNORE INTO word (wordName) VALUES (?)', [this.wordName]);
      }
    
      static deleteById(id) {
        
      }
    
      static fetchAll() {
        return db.execute('SELECT * FROM word');
      }
    
      static findById(id) {
        return db.execute('SELECT * FROM `word` WHERE `wordId` = ?', [id])  
      }
};