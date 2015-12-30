'use strict';
let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let config = require('config');

// Database configure
let mongoose = require('mongoose');

let hasConfig = config.has('dbConfig.host') &&
  config.has('dbConfig.port') && config.has('dbConfig.dbName');

if (hasConfig) {
  let debug = require('debug')('mongodb');
  const HOST = config.get('dbConfig.host');
  const PORT = config.get('dbConfig.port');
  const TABLE_NAME = config.get('dbConfig.dbName');
  debug(`MongoDB READY! ${HOST}:${PORT}/${TABLE_NAME}`);
  mongoose.connect(`${HOST}:${PORT}/${TABLE_NAME}`);
} else {
  let debug = require('debug')('mongodb');
  debug(`Database config not found!`);
}

let conn = mongoose.connection;

let routes = require('./routes/index');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  req.conn = conn;
  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
