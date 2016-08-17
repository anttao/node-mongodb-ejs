var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var demoSchema = new Schema({
	uid : String,
	title:String,
	content:String,
	createTime : { type: Date, default: Date.now }
});

var articleSchema = new Schema({
	uid : String,
	title: String,
	content: String,
	createTime : { type: Date, default: Date.now }
});

exports.Demo = mongoose.model('Demo',articleSchema);
exports.Article = mongoose.model('Article',articleSchema);
