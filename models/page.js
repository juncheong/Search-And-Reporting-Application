const db = require('../util/db_' + process.env.NODE_ENV);

module.exports = class page {
    constructor(id, url, title, description, lastModified, lastIndexed, timeToIndex) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.description = description;
        this.lastModified = lastModified;
        this.lastIndexed = lastIndexed;
        this.timeToIndex = timeToIndex;
      }
    
      save() {
        return db.execute(
            'INSERT INTO page (url, title, description, lastModified, lastIndexed, timeToIndex) VALUES (?, ?, ?, ?, ?, ?) ',
            [this.url, this.title, this.description, this.lastModified, this.lastIndexed, this.timeToIndex]
        );
      }
    
      static deleteById(id) {
        
      }
    
      static fetchAll() {
        return db.execute('SELECT * FROM `page`');
      }
    
      static findById(id) {
        return db.execute('SELECT * FROM `page` WHERE `pageId` = ?', [id]);
      }

      static findIdByUrl(url){
        return db.execute('SELECT pageId FROM `page` WHERE page.url = ?', [url]);
      }
};