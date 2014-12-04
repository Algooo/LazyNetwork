
/**
 * Module dependencies.
 */

define(['http', 'module', 'path', 'express', 'mongoose', 'serve-favicon', 'morgan', 'body-parser', 'method-override', 'errorhandler'], 
function (http, module, path, express, db, favicon, logger, bodyParser, methodOverride, errorhandler) {

    //var express = require('express');
    //var http = require('http');
    //var path = require('path');

    var app = express();

    // routes
    requirejs('./routes/home');
    requirejs('./routes/contact');
    requirejs('./routes/index');
    //var user = require('./routes/user');

    // Database
    var dbURL = 'mongodb://127.0.0.1:27017/LazyNetwork';

    if(process.env.OPENSHIFT_MONGODB_DB_URL){
  	dbURL = process.env.OPENSHIFT_MONGODB_DB_URL + 'LazyNetwork';
    }
    db.connect(dbURL);

    // all environments
    var dirname = path.dirname(module.uri);
    app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
    app.set('server_ip_address', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
    app.set('views', path.join(dirname, 'views'));
    app.set('view engine', 'jade');
    // app.use(express.favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride());
    app.use(require('less-middleware')(path.join(dirname, 'public')));
    app.use(express.static(path.join(dirname, 'public')));

    // development only
    if ('development' == app.get('env')) {
      app.use(errorhandler());
    }

    //app.get('/users', user.list);

    http.createServer(app).listen(app.get('port'), app.get('server_ip_address'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });
    return app;
});