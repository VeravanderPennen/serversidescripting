var express = require('express');
var router = express.Router();

// Fake unsafe crappy object database
/*var users = [
  {username:"ju5tu5", password:"letmein"}
  {username:"vera", password:"veilig"}
];*/

// Should we login or show the sensitive data
router.get('/', function(req, res, next) {
  if(req.session.username){
    //res.locals.title = req.session.username;
    res.send("Welcome, " + req.session.username);
    res.render('users/index');
  }else{
    res.redirect(req.baseUrl + '/login');
    res.send("We should redirect you to the form to login");
  }
});

// Logout and redirect
router.get('/logout', function(req, res, next){
  req.session.destroy(function(){
    res.send("logout success!");
    res.redirect(req.baseUrl);
  });
});

// Show the login form
router.get('/login', function(req, res, next) {
  res.locals.req = req;
  res.render('users/login');
});

// Handle authentication posted from the form (no checks at all)
router.post('/login', function(req, res, next) {
  if((req.body.username === 'vera' ) && (req.body.password === 'veilig')){//CHECK IF THE LOGIN CREDENTIALS ARE CORRECT
  //req.session.regenerate(function(){
    //req.session.login = true;
    req.session.username = req.body.username;
    res.redirect(req.baseUrl);
    //res.send("login success!");
  } else{
    res.send('Invalid password');
  }});

module.exports = router;
