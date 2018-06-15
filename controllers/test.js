'use strict';
class Test {
    constructor() {

    }

    render(req, res, next) {
           // res.writeHead(200, {'Content-Type': 'text/html;charset=UTF8'});
           res.status(200).render('test', {title:'Test Page', msg: "test message"});
           // next();
    }
}
module.exports = Test;