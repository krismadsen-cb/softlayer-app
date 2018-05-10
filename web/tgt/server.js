var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var api = require('../srv/api');

//AMAZINASDF
module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html');
    const publicPath = express.static(__dirname);
    app.use(compression());
    app.set('view engine', 'ejs');
    app.use('/', publicPath);
    app.use('/', api.devices);
    app.use('/', api.events);
    app.use('/', api.security);
    app.use('/', api.tickets);
    app.use('/tgt', express.static(__dirname));
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '/index.html'))
    });

    // uncomment after placing your favicon in /public
  //  app.use(favicon(path.join(icoPath, 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

// error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      console.log(err)
    });
    return app;
  }
}
