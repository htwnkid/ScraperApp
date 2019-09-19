let mongoose = require('mongoose');

var schema = new mongoose.Schema({ title: String, link: String, notes: Array });
var Article = mongoose.model('Article', schema);