var express = require('express');
var router = express.Router();

// connectie met database users
router.get('/', function(req, res){
  if(req.session.username){ //check of gebruiker is ingelogd (sessie)
	    req.getConnection(function(err, connection){
		    connection.query('SELECT * FROM users', function(err,results) { //gegevens users opvragen
			    console.log(results);
			    res.render('users/index', { //bevestigings pagina na inloggen
			      title: 'Welcome, ' + req.session.username, users: results
			    });
			});
		});
  } else {
    // Redirect the user here
    res.redirect('/users/login'); //als de gebruiker nog niet is ingelogd, dan naar inlogscherm
  }
});

// Laad het login formulier
router.get('/login', function(req, res, next) {
  res.render('users/login', {
    postUrl: '/users/login',
    error: false
  });
});

// Login ingevulde gegevens afhandelen
router.post('/login', function(req, res){
  var username = req.body.username; //username = ingevulde username
  var password = req.body.password; //password = ingevuld password
req.getConnection(function(err, connection){ //verbinden met database users, daarna gegevens opvragen van persoon
  connection.query('SELECT * FROM users WHERE name = ? AND password = ?', [username, password],function(err,results) {
    console.log(results[0].length);
  if(results.length>0) { //gebruiker is identiek
      req.session.username = results[0].name; //zet in sessie
      res.redirect('/users');
  } else {
      res.render('users/login', {
        postUrl: '/users/login',
        error: 'Gebruikersnaam en/of wachtwoord onjuist.' //foutmelding als gegeven(s) niet goed zijn ingevuld
        });
      };
    });
  });
});

//laden van registratie formulier
router.get('/register', function(req, res) {
  res.render('users/register', {
    postUrl: '/users/register',
    error: false
  });
});

//ingevulde gegevens bij registratie afhandelen
router.post('/register', function(req, res) {
  req.getConnection(function (err, connection) { //verbinden met database users
    var data = {
        name         : req.body.username,
        password     : req.body.password
    };
    if(req.body.username!='' && req.body.password!='') { //username+password moeten een waarde hebben.
	    connection.query("INSERT INTO users set ? ", [data], function(err, results) { //gegevens invoegen in database users
	      res.render('index', {
          title: "Welcome",
          message: "Registration succesfull" //bericht dat registratie is gelukt
        });
      });
	} else {
		res.redirect('users/register', {
			postUrl: '/users/register',
			error: 'Gebruikersnaam en/of wachtwoord niet ingevuld.' //bericht als een of beide invoervelden geen inhoud hebben
		});
  };
  });
});

//laadt edit formulier voor geselecteerde gebruiker
router.get('/edit/:index', function(req, res) {
	req.getConnection(function(err, connection){ //connectie met database users
		connection.query('SELECT * FROM users WHERE id = ?', [req.params.index],function(err,results) { //gegevens users opvragen
			if(results.length > 0) { //gebruiker is identiek
				res.locals.error = false;
				res.locals.user = results[0];
				res.locals.postUrl = '/users/edit/'+results[0].id;
 			} else {
				res.locals.error = 'Gebruiker niet gevonden'; //bericht als geselecteerde gebruiker niet bestaat/is gevonden
			}
			res.render('users/edit');
		});
	});

});

//afhandelen van nieuwe gegevens (UPDATEN IN DATABASE)
router.post('/edit/:index', function(req, res) {
  req.getConnection(function (err, connection) {
    var data = {
        name         : req.body.username,
        password     : req.body.password
    };
    connection.query("UPDATE users set ? WHERE id = ?", [data, req.params.index], function(err, results) {
      res.redirect('/users');
    });
  });
});

//als gebruiker wordt verwijderd, deleten uit database via link (view)
router.get('/remove/:index', function(req, res) {
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM users WHERE id = ?', [req.params.index],function(err,results) {
			res.redirect('/users');
		});
	});

});


// Logout and redirect to login form
router.get('/logout', function(req, res, next){
  req.session.destroy();
    res.redirect('/users/login')
  });

module.exports = router;
