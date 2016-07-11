var express = require('express');
var router = express.Router();


/* var express = require('express');
app = express
var router = express.Router();

// Authentication and Authorization Middleware
router.get("/", function(req, res){
  if(req.session.username){
    res.send("Welcome, " + req.session.username);
  } else {
    // Redirect the user here
    res.send("We should redirected to the form to login");
    res.redirect('/login');
  }
});

router.get("/", function(req, res) {
   if (req.session.username){
       res.redirect('/users');
   } else {
       res.render{'users/login');

// Login endpoint
router.post('/login', function (req, res) {
  var username=req.body.username;
  var password=req.body.password;
  if (!req.query.username || !req.query.password) {
    res.send('login failed');
  } else if(req.query.username === "vera" || req.query.password === "veraspassword") {
    req.session.username = username;
    req.redirect('/users');
    res.send("login success!");
  }
});

// Logout endpoint
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});

module.exports = router;

/*
// Routing is de Top Layer app.all, app.get enz.
router.get('/login', function(req, res) {
  res.render('index', {title: 'SSS - Exercise 3'});
});
*/
