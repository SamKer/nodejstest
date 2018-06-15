var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//
// module.exports = router;
module.exports = [
    {
        path: "/",
        method: 'GET',
        callback: (req, res, next) => {
            var Home = require('../controllers/home');
            var H = new Home();
            H.render(req, res);
        }
    },
    {
        path: "/test",
        method: 'GET',
        callback: (req, res, next) => {
            var Test = require('../controllers/test');
            var T = new Test();
            T.render(req, res);
        }
    },
    {
        path: "/vue",
        method: 'GET',
        callback: (req, res, next) => {
            var Vue = require('../controllers/vue');
            var V = new Vue();
            V.render(req, res);
        }
    },
    {
        path: "/avatar",
        method: 'POST',
        upload: 'dummyname',
        callback: (req, res, next) => {
            var Upload = require('../controllers/Upload');
            var U = new Upload();
            U.save(req);
            U.render(req,res);
        }
    },
    {
        path: "/data",
        method: 'GET',
        callback: (req, res, next) => {
            var DB = require('../controllers/DB');
            var d = new DB('localhost',27017, 'tp',{}, (db) => {
                db.getCollection('test').insertMany([
                    {smartphone: 'Samsung S', price: 'trop cher'},
                    {smartphone: 'Iphone 7', price: 'c n importe quoi'},
                    {smartphone: 'Sony Xperia', price: 'c pas mal'},
                    {smartphone: 'Honor 8', price: 'c quoi ça'}
                    ]
                )
                    .then((r)=>{
                        console.log('inserted docs in mongo');
                        db.render(req,res);
                    });

            });
            // db.save(req);
            // db.render(req,res);
        }
    },
    {
        path: "/data/list",
        method: 'GET',
        callback: (req, res, next) => {
            var DB = require('../controllers/DB');
            var d = new DB('localhost',27017, 'tp',{}, (db) => {
                db.getCollection('test').find({smartphone:{$exists:true}}).sort({smartphone:1}).toArray((e, list)=> {
                    db.render(req,res,next,list);
                });
            });
            // db.save(req);
            // db.render(req,res);
        }
    },
    {
        path: "/mongoose",
        method: 'GET',
        callback: (req, res, next) => {
            var DB2 = require('../controllers/DB2');
            var d = new DB2('localhost',27017, 'tp');
            d.connection.once('open',()=>{
                console.log('connected');
                d.populate().then((p)=>{
                    console.log('schema created', p._id);
                })
            })
            // db.save(req);
            d.render(req,res,next,[]);
        }
    },
    {
        path: "/hotels",
        method: 'GET',
        callback: (req, res, next) => {
            var hotels = require('../controllers/Hotel');
            var all = hotels.getAll();
            // db.save(req);
            hotels.render(req,res,next,all);
        }
    }
];