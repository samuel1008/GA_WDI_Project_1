/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/albums
function index(req, res) {
  db.Snippet.find({}, function(err, allSnippets) {
    res.json(allSnippets);
  });

}

// create new snippet
function create(req, res) {
  var newSnippet = new db.Snippet({
    title: req.body.title,
    text: req.body.text
  });
  console.log(newSnippet);
  // save new snippet in db
  newSnippet.save(function (err, savedSnippet) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      console.log("saved ", savedSnippet.title);
      res.json(savedSnippet);
    }
  });
}



// delete post
function destroy (req, res) {
  // get post id from url params (`req.params`)
  var snippetId = req.params.snippetId;

  // find post in db by id and remove
  db.Snippet.findOneAndRemove({ _id: snippetId }, function (err, deletedSnippet) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(deletedSnippet);
    }
  });
}

function update (req, res) {
  console.log('updating with data', req.body);
  db.Snippet.findById(req.params.snippetId, function(err, foundSnippet){
    if(err){
      console.log('snippetsController.update error', err);
    }
    foundSnippet.title = req.body.title;
    foundSnippet.text = req.body.text;
    foundSnippet.save(function(err, savedSnippet){
      if(err) {
        console.log("saving altered snippet failed");
      }
      res.json(savedSnippet);
    });
  });

}

// export public methods here
module.exports = {
  index: index,
  create: create,
  // show: show,
  destroy: destroy,
  update: update
};
