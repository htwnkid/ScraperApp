var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var earticleSchema = new mongoose.Schema({
    title: String,
    link: String,
    notes: [{ note: String, date: Date }]
});

