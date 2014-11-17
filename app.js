
/**
 * Module dependencies.
 */

define(['http', 'module', 'path', 'express', 'mongoose'], function (http, module, path, express, db) {

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
    var dbURL = 'mongodb://192.168.2.105:27017/LazyNetwork';
    db.connect(dbURL);

    // all environments
    var dirname = path.dirname(module.uri);
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('less-middleware')({ src: path.join(dirname, 'public') }));
    app.use(express.static(path.join(dirname, 'public')));

    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }

    //app.get('/users', user.list);

    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });
    return app;
});