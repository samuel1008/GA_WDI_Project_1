var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
  Comment = require('./comment');

var CommentSchema = new Schema({
  comment: String
});

var SnippetSchema = new Schema({
  title: String,
  text: String,
  comments: [CommentSchema]
});

var Snippet = mongoose.model('Snippet', SnippetSchema);
module.exports = Snippet;
