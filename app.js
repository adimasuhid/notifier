
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , odesk = require('node-odesk');

var app = express();
var o = new odesk("07101e99ab7fe47e8834d67beb043bd4", "c27140c2ddae4b10");

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/odesk', function(req, res){
    o.OAuth.getAuthorizeUrl(function(error, url, requestToken, requestTokenSecret) {
            var url= url;
            var requestToken = requestToken;
            var requestTokenSecret = requestTokenSecret;
            console.log(url, requestToken, requestTokenSecret);
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
