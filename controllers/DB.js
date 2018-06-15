'use strict';
const MongoDB = require('mongodb');
class DB  extends MongoDB {
    constructor(url, port, db, options, callback) {

        super(`mongodb://${url}:${port}`, (e,client)=>{
            this.dbname = db;
            if(e) {
                console.log(e);
            } else {
                this.client = client;
                this.db = client.db(db);
                callback(this);
            }
        });
    }

    getCollection(collection) {
        return this.db.collection(collection);
    }


    render(req, res, next, list) {
        this.client.close();
        res.render('db', {
            title:'data List',
            db: this.dbname,
            collection: 'test',
            list: list
        });
    }
}
module.exports = DB;