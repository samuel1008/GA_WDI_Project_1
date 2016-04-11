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

var controllers = require('./controllers');

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

app.set('view engine', 'hbs');




/**********
 * ROUTES *
 **********/

/*
 * HTML ENDPOINTS
 */
 app.get('/', function homepage(req, res) {
   if (req.user) {
  console.log(__dirname);
  res.render('index', {user: JSON.stringify(req.user) + " || null"});
} else {
  res.redirect('/login');
}
});

// AUTH ENDPOINTS
// show signup view
app.get('/signup', function (req, res) {
  res.render('signup');
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  var new_user = new User({ username: req.body.username });
  User.register(new_user, req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
    }
  );
});

// show login view
app.get('/login', function (req, res) {
  res.render('login');
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(JSON.stringify(req.user));
  res.redirect('/');
});

app.get('/signup', function (req, res) {
  // don't let the user signup again if they already exist
  if (req.user) {
    return res.redirect('/');
  }
  res.render('signup'); // signup form
});

app.get('/login', function (req, res) {
  // if user is logged in, don't let them see login view
  if (req.user) {
    return res.redirect('/');
  }

  res.render('login'); // you can also use res.sendFile
});

// log out user
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
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
 app.put('/api/snippets/:snippetId', controllers.snippets.update);

/*********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('Express server is running on http://localhost:3000/');
});
