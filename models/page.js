const db = require('../util/db_' + process.env.NODE_ENV);

module.exports = class page {
    constructor(id, url, description, title, lastModified, lastIndexed, timeToIndex) {
        this.id = id;
        this.url = url;
        this.description = description;
        this.title = title;
        this.lastModified = lastModified;
        this.lastIndexed = lastIndexed;
        this.timeToIndex = timeToIndex;
      }
    
      save() {
        return db.execute(
            'INSERT INTO page (url, description, title, lastModified, lastIndexed, timeToIndex) VALUES (?, ?, ?, ?, ?, ?)',
            [this.url, this.description, this.title, this.lastModified, this.lastIndexed, this.timeToIndex]
        );
      }
    
      static deleteById(id) {
        
      }
    
      static fetchAll() {
        return db.execute('SELECT * FROM `page`');
      }
    
      static findById(id) {
        return db.execute('SELECT * FROM `page` WHERE `pageId` = ?', [id])  
      }
};