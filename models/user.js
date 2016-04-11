var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
    Snippet = require('./snippet');

var UserSchema = new Schema({
  username: String,
  password: String,
  snippet: [Snippet.schema]
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
module.exports = User;
