const db = require('../util/db_' + process.env.NODE_ENV);

module.exports = class PageWord {
    constructor(id, pageId, wordId, freq) {
      this.id = id;
      this.pageId = pageId;
      this.wordId = wordId;
      this.freq = freq;
    }
  
    save() {
      return db.execute(
          'INSERT INTO page_word (pageId, wordId, freq) VALUES (?, ?, ?)',
          [this.pageId, this.wordId, this.freq]
      );
    }
  
    static fetchAll() {
      return db.execute('SELECT * FROM `page_word`');
    }
  
    static findById(id) {
      return db.execute('SELECT * FROM `page_word` WHERE `pageId` = ?', [id])  
    }
};