const db = require('../util/db_' + process.env.NODE_ENV);

module.exports = class Word {
    constructor(id, wordName) {
      this.id = id;
      this.wordName = wordName;
    }
    
    save() {
      return db.execute('INSERT IGNORE INTO word (wordName) VALUES (?)', [this.wordName]);
    }
  
    static fetchAll() {
      return db.execute('SELECT * FROM word');
    }
  
    static findById(id) {
      return db.execute('SELECT * FROM `word` WHERE `wordId` = ?', [id]);  
    }

    static findByWordName(wordName){
      return db.execute('SELECT wordId FROM word WHERE wordName = ?', [wordName]);
    }

    static getMaxId(){
      //return db.execute('SELECT LAST_INSERT_ID()');
      return db.execute('SELECT max(wordId) FROM word');
    }
};