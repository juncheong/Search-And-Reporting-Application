const db = require('../util/db_' + process.env.NODE_ENV);

module.exports = class page {
    constructor(id, url, description, title, lastModified, lastIndexed) {
        this.id = id;
        this.url = url;
        this.description = description;
        this.title = title;
        this.lastModified = lastModified;
        this.lastIndexed = lastIndexed;
      }
    
      save() {
        return db.execute(
            'INSERT INTO page (url, description, title, lastModified, lastIndexed) VALUES (?, ?, ?, ?, ?)', 
            [this.url, this.description, this.title, this.lastModified, this.lastIndexed]
        );
      }
    
      static deleteById(id) {
        
      }
    
      static fetchAll() {
        return db.execute('SELECT * FROM page');
      }
    
      static findById(id) {
        
      }
};