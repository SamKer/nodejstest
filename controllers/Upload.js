'use strict';
class Upload {
    constructor() {

    }

    save(req) {
        var path = require('path');
        var fs  = require('fs');
        var dest = path.normalize(__dirname+'/../public/images/index.jpg');
        // console.log('to', dest);
        fs.copyFile(req.file.path, dest, ()=>{console.log('copied')});
        // console.log(req.file);
    }

    render(req, res, next) {
        res.redirect('/');
    }
}
module.exports = Upload;