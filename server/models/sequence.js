// db.sequences.insertOne({ "maxDocumentId" : 100, "maxMessageId" : 100, "maxContactId" : 100 })


var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var schema = new Schema({
    maxDocumentId: { type: String, required: true},
    maxMessageId: { type: String, required: true},
    maxContactId: { type: String, required: true}    
});

module.exports = mongoose.model("Sequence", schema);