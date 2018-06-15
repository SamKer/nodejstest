'use strict';
const mongoose = require('mongoose');
class Hotel  {

    constructor() {

    }



    render(req, res, next, list) {
        // this.connection.close();
        let list = {test:'abc'};
        res.renderJson(list);
    }
}
module.exports = Hotel;