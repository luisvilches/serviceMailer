const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Service = new Schema({
    name: String,
    to: String
});


module.exports = mongoose.model('Service',Service);