'use strict';
let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let config = require('config');

// Database configure
let mongoose = require('mongoose');

let hasConfigFile = config.has('dbConfig.host') &&
  config.has('dbConfig.port') && config.has('dbConfig.dbName');

if (hasConfigFile) {
  let debug = require('debug')('mongodb');
  const HOST = config.get('dbConfig.host');
  const PORT = config.get('dbConfig.port');
  const DB_NAME = config.get('dbConfig.dbName');
  debug(`MongoDB using configure file! ${HOST}:${PORT}/${DB_NAME}`);
  mongoose.connect(`${HOST}:${PORT}/${DB_NAME}`);
} else {
  let debug = require('debug')('mongodb');
  const HOST = process.env.DB_HOST;
  const PORT = process.env.DB_PORT;
  const DB_NAME = process.env.DB_NAME;
  debug(`MongoDB using environment variable! ${HOST}:${PORT}/${DB_NAME}`);
  mongoose.connect(`${HOST}:${PORT}/${DB_NAME}`);
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
  let err = new Error('Not Found');
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
