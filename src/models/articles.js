let mongoose = require('mongoose');

var schema = new mongoose.Schema({ title: String, link: String, notes: Array });
var Articles = mongoose.model('Articles', schema);

module.exports = Articles