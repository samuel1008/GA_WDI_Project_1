/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/albums
function index(req, res) {
  db.Snippet.find(function(err, snippets){
    if (err) {
      console.log("noooo");
    }
      res.json(snippets);
      console.log("snippets controller 1");
    });

}

// export public methods here
module.exports = {
  index: index,
  // create: create,
  // show: show,
  // destroy: destroy,
  // update: update
};
