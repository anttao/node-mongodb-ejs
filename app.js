
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/list.html', routes.list);
app.get('/users', user.list);
app.get('/add.html',routes.add);
app.post('/add.html', routes.create);
app.get('/del.html',routes.delById);
app.get('/modify.html', routes.toModify);
app.post('/modify.html', routes.modify);
app.get('/article.html', routes.article);
app.post('/article.html', routes.articleAdd);
app.get('/delArticle.html',routes.delByArticleId);
app.get('/modifyArticle.html', routes.toModifyArticle);
app.post('/modifyArticle.html', routes.modifyArticle);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
