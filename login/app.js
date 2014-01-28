/*
 * Module dependencies.
 */


var sessionSecret = 'ThisIsASessionSecret';
var express = require('express');
var routes = require('./routes');
var login = require('./routes/login');
var http = require('http');
var path = require('path');

//MongoDB requires
var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: sessionSecret}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Gets
app.get('/', routes.index);
app.get('/login', login.login);
app.get('/logout', login.logout);
app.get('/newuser', login.newuser);

// Posts
app.post('/loginuser', login.loginuser);
app.post('/adduser', login.adduser);

function requireAuthentication(req, res, next) {
    if(req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied';
        res.location('/login');
        res.redirect('/login');
    }
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
