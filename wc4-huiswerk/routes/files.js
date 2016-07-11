var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer');

// Voeg zelf de benodigde view nog toe
// [GET] /files
router.get('/', function(req,res){
    fs.readdir('public/uploads/', function(err, files) {
        if(err) return next(err);
        // geef de bestandenarray mee aan de view
        res.locals.files = files;
        res.locals.title = 'files';
        res.render('files/index');
    });
});

// Show the upload form
router.get('/upload', function(req, res, next){
    res.render('files/upload');
});

// Heb je nog meer routes nodig voor het uploaden en weergeven?

router.post('/upload', function(req, res, next) {
    console.log(req.file);
  // A file was uploaded if req.file is not undefined
  if(req.file !== undefined) {
    //move the file
    fs.rename(req.file.path, req.file.destination + req.file.originalname, function(err){
        if(err) return next(err);
    });
  }
    //check for file types
    res.locals.req = req;
    res.locals.title = "Uploadlist";
    res.redirect('/files');
});

router.get('upload/remove', function (req, res, next) {
    fs.remove(req.file.path, function(err){
        if(err) return next(err);
});
};

//res.render('views/users/index', { title: 'Uploaded Files' }, req.files);

module.exports = router;
