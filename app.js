var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

var viewsPath = path.join(__dirname, 'views');

// view engine setup
// app.set('views', viewsPath);
// app.settings.views = path.join(__dirname, 'views');

//test ejs
// app.set('views', path.join(viewsPath, 'ejs'));
// app.set('view engine', 'ejs');


//test twig
// var twig = require('twig').twig;
app.set('views', path.join(viewsPath, 'twig'));
app.set('view engine', 'twig');

//vuejs
// var expressVue = require("express-vue");
// const expressVueMiddleware = expressVue.init();
// app.set('views', path.join(viewsPath, 'vue'));
// app.use(expressVueMiddleware);
// app.set('view engine', 'vue');

// app.set('view cache', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const multer =require('multer');
var up = multer({dest: 'upload/'});

//load all routes
require('./routes/routes').forEach((r) => {
    if('upload' in r) {
        app[r.method.toLowerCase()](r.path, up.single(r.upload), r.callback);
    } else {
        app[r.method.toLowerCase()](r.path, r.callback);
    }
});
// app.use('/', indexRouter);
app.use('/users', require('./routes/users'));
//
// app.use('/test', (req, res)=> {
//
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
