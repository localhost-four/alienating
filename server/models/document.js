const mongoose = require('mongoose');


var Schema = mongoose.Schema;

var documentSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String},
    url: {type: String, required: true}
});

module.exports = mongoose.model('Document', documentSchema);