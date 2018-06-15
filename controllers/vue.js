'use strict';
class Vue {
    constructor() {

    }

    render(req, res, next) {
           // res.writeHead(200, {'Content-Type': 'text/html;charset=UTF8'});
           res.status(200).render('main', {title:'vue Page', msg: "vue message"});
           // next();
    }
}
module.exports = Vue;