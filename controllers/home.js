'use strict';
class Home {
    constructor() {

    }

    render(req, res) {
           // res.writeHead(200, {'Content-Type': 'text/html;charset=UTF8'});
        res.status(200).render('index', {title:'Home Page'});
    }
}
module.exports = Home;