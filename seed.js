var db = require('./models');

var snippetObject = {
  title: "working",
  text: "work hard late at night when I heard a boom."
};

db.Snippet.remove({}, function(err, deletedSnippets){

  db.Snippet.create( snippetObject, function(err, successfulSnippet){
    if (err) { return console.log('ERROR', err); }

    console.log("success! HEre's the actual DB Entry: ", successfulSnippet);
    process.exit();
  });
  console.log("Everything removed!");
});
