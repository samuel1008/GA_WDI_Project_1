var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project_01');

module.exports.Snippet = require("./snippet");
module.exports.User = require("./user");
