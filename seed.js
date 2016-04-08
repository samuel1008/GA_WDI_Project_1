var db = require('./models');

var snippetObject = {
  name: "Justin",
  address: "225 Bushie",
  favoriteColor: "Periwinkle",
  shoes: [ "Mahabis", "Sambas", "Cons", "Cole Haan" ]
};

db.Snippet.remove({}, function(err, deletedSnippets){

  db.Snippet.create( snippetObject, function(err, successfulSnippet){
    if (err) { return console.log('ERROR', err); }

    console.log("success! HEre's the actual DB Entry: ", successfulSnippet);
    process.exit();
  });
  console.log("Everything removed!");
});
