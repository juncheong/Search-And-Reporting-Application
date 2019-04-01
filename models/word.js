const db = require('../util/db_' + process.env.NODE_ENV);

module.exports = class word {
    constructor(id, word) {
        this.id = id;
        this.word = word;
      }
    
      save() {
        return db.execute('INSERT INTO word (word) VALUES (?)', [this.word]);
      }
    
      static deleteById(id) {
        
      }
    
      static fetchAll() {
        return db.execute('SELECT * FROM word');
      }
    
      static findById(id) {
        
      }
};