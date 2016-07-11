var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer');

// maak mapje voor geuploade bestanden en verklaar dus waar 'files' te vinden zijn
router.get('/', function(req, res, next){
    fs.readdir('public/uploads/', function(err, files) {
        if(err) return next(err);
        //verklaar wat 'files'array is in de view
        res.locals.files = files;
        //laat bestanden weergave zien
        res.render('index');
      });
  });

// Formulier voor uploaden laden
router.get('/upload', function(req, res, next){
  if (req.session.username){ //als bezoeker is ingelogd, dan kan hij uploaden
    res.render('files/upload');
  }
  else {
    res.render('users/login', { //inloggen, als bezoeker niet is ingelogd, maar wel wil uploaden
    postUrl: '/users/login',
    error: 'Log in for uploading files'
      });
   }
});

// geuploade betand afhandelen
router.post('/upload', function(req, res, next) {
  req.getConnection(function (err, connection){
  connection.query('SELECT * FROM comments', function(err, results){
    res.locals.comments = results;
    fs.readdir('public/uploads/', function(err, files) {
      if(err) return next(err);
      //verklaar wat 'files'array is in de view
      res.locals.files = files;
      console.log(req.file);
        if(req.file !== undefined) { //als er een bestand is geupload
          //move the file
          fs.rename(req.file.path, req.file.destination + req.file.originalname, function(err){ //info bij het bestand
            if(err) return next(err);
        });
  }
      res.locals.req = req;
      res.render('index', {//laat bestanden zien (+ net geuploade bestand)
        message: "Image uploaded"})
      });
    });
  });
});

// ingevulde comment afhandelen
router.post('/comment', function(req, res) {
  fs.readdir('public/uploads/', function(err, files) {
    if(err) return next(err);
    //verklaar wat 'files'array is in de view
    res.locals.files = files;
  req.getConnection(function (err, connection) { //connectie met database
    connection.query('SELECT * FROM comments', function(err, results){
      res.locals.comments = results;
  });
  var data = {
      comment      : req.body.comment,
      photo_id     : req.body.photo_id
    };
    if(req.body.comment !='') { //er moet wel wat ingevuld zijn, in dat geval dan...
	    connection.query("INSERT INTO comments set ? ", [data], function(err, results) { //voeg comment toe aan database
        if(err){
  				console.log(err);
  			}
  			res.render('index', {
        message: "Comment posted"
        });
      });
	}
    else {
		    res.render('index', {
        message: 'Say something...'
  		    });
        };
     });
  });
});

module.exports = router;
