// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),

    //  NEW ADDITIONS
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

    var db = require("./models"),
        Post = db.Post,
        User = db.User;

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
// app.use(bodyParser) is a middleware
app.use(bodyParser.urlencoded({ extended: true }));
// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey', // change this!
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var controllers = require('./controllers');


/**********
 * ROUTES *
 **********/

/*
 * HTML ENDPOINTS
 */
 app.get('/', function homepage(req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/views/index.html');
});

// AUTH ENDPOINTS
app.post('/signup', function (req, res) {
  // if user is logged in, don't let them sign up again
  if (!req.user) {
    return res.redirect('/');
  }

  var new_user = new User({ username: req.body.username });
  User.register(new_user, req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        console.log("SIGNUP SUCCESS");
        res.redirect('/');
      });
    }
  );
});

app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(JSON.stringify(req.user));
  res.redirect('/');
});

app.get('/logout', function (req, res) {
  console.log("BEFORE logout", req.user);
  req.logout();
  console.log("AFTER logout", req.user);
  res.redirect('/');
});

/*
 * JSON ENDPOINTS
 */
 app.get('/api', controllers.api.index);
 app.get('/api/snippets', controllers.snippets.index);
 // app.get('/api/snippets/:snippetId', controllers.snippets.show);
 app.post('/api/snippets', controllers.snippets.create);
 app.delete('/api/snippets/:snippetId', controllers.snippets.destroy);
 // app.put('/api/snippets/:snippetId', controllers.snippets.update);

/*********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('Express server is running on http://localhost:3000/');
});
