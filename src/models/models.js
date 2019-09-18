let mongoose = require('mongoose');

var schema = new mongoose.Schema({ title: 'string', link: 'string', notes: [{ note: String, date: Date }] });
var Tank = mongoose.model('Article', schema);