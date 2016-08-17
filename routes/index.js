
/*
 * GET home page.
 */
var mongoose = require('mongoose');
var model = require('./model');
var Demo = model.Demo;
var Article = model.Article;

mongoose.connect('mongodb://localhost/monkey');
 
exports.index = function(req, res){
	
	Demo.find(function(err,docs){
		res.render('index.html', {
			title:'Express Demo Example',
			demos:docs
		});
	});
	
};

//文章列表
exports.list = function(req, res){
	
	Article.find(function(err,docs){
		res.render('list.html', {
			title:'文章列表',
			articles:docs
		});
	});
	
};

//添加文章
exports.article = function(req, res) {
	res.render('article.html', {'title' :'文章列表'});
};

exports.articleAdd = function(req, res) {
	var drticle = new Article({
		uid : req.body.uid,
		title: req.body.title,
		content : req.body.content
	});
	
	drticle.save(function(err,doc){
		console.log(doc);
		res.redirect('/list.html');
	});
};

//跳转到添加页面
exports.add = function(req, res) {
	console.log('----here');
	res.render('add.html', {title :'添加 demo list'});
};

//创建新纪录
exports.create = function(req, res){
	var demo = new Demo({
		uid : req.body.uid,
		title: req.body.title,
		content : req.body.content
	});
	
	demo.save(function(err,doc){
		console.log(doc);
		res.redirect('/');
	});
};

// 根据id删除相应的记录
exports.delById = function(req, res) {
	
	var id = req.query.id;
	
	if(id && '' != id) {
		console.log('----delete id = ' + id);
		Demo.findByIdAndRemove(id, function(err, docs) {
			res.redirect('/');
		});
	}
	
};

//根据文章id删除文章
exports.delByArticleId = function(req,res){
	var id = req.query.id;

	if(id && '' != id) {
		Article.findByIdAndRemove(id,function(err,docs){
			res.redirect('/list.html');
		});
	}
};

// 查询对应修改记录，并跳转到修改页面
exports.toModify = function(req, res) {
	var id = req.query.id;
	console.log('id = ' + id);
	
	if(id && '' != id) {
		Demo.findById(id, function(err, docs){			
			res.render('modify.html',{title:'修改ToDos',demo:docs});
		});
	};

};

//修改相应的值
exports.modify = function(req, res) {
	
	var demo = {
		uid : req.body.uid,
		title: req.body.title,
		content : req.body.content
	};
	
	var id = req.body.id; //因为是post提交，所以不用query获取id
	if(id && '' != id) {
		Demo.findByIdAndUpdate(id, demo,function(err, docs) {
			res.redirect('/');
		});
	}
	
};


// 查询对应修改记录，并跳转到修改页面
exports.toModifyArticle = function(req, res) {
	var id = req.query.id;
	
	if(id && '' != id) {
		console.log('----delete id = ' + id);
		Article.findById(id, function(err, docs){
			res.render('modifyArticle.html',{title:'修改文章内容',article:docs});
		});
	};

};

//修改相应的值
exports.modifyArticle = function(req, res) {
	
	var article = {
		uid : req.body.uid,
		title: req.body.title,
		content : req.body.content
	};
	
	var id = req.body.id; //因为是post提交，所以不用query获取id
	if(id && '' != id) {
		Article.findByIdAndUpdate(id, article,function(err, docs) {
			res.redirect('/list.html');
		});
	}
	
};

exports.modifyArticle = function(req,res){

	var article = {
		uid: req.body.uid,
		title: req.body.title,
		content: req.body.content
	};

	var id = req.body.id;
	if(id && '' != id){
		Article.findByIdAndUpdate(id,article,function(err,docs){
			console.log('update------'+docs);
			res.redirect('/list.html');
		});
	};

}