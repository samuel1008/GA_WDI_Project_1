var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SnippetSchema = new Schema({
  title: String,
  text: String
});

var Snippet = mongoose.model('Snippet', SnippetSchema);

module.exports = Snippet;
