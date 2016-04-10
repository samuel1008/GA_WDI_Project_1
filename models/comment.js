var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  comment: String
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
