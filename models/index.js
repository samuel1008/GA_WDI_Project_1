var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project_01');

module.exports.Snippet = require("./snippet");
module.exports.User = require("./user");

mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "YOUR CURRENT LOCALHOST DB CONNECTION STRING HERE" );
