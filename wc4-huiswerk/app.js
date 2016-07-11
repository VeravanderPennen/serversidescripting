// var bodyParser = require('body-parser');
var express = require('express');
var multer  = require('multer');
var path = require('path');
var session = require('express-session');
var mysql = require('mysql');
var myConnection = require('express-myconnection');

//Set up the app
var app = express();

// Tell multer to store any uploaded files in the uploads subdirectory in your project.
var upload = multer({dest: 'public/uploads/'});
                   //limits: {fileSize: 1000000, files:1});

// Worden alle routers al geladen?
var fileRoutes = require('./routes/files');
var userRoutes = require('./routes/users');

//Connect to MYSQL
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'student',
    password: 'serverSide',
    port: 3306,
    database: 'student'
}, 'single'));

// Setup serveren van statische bestanden
app.use(express.static('public'));

// Setup de view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setup routing - users
app.use('/files', upload.single('yourfile'), fileRoutes);
app.use('/users', userRoutes);

// Setup initial routing - index
app.get('/', function(req, res) {
  res.render('index', {title: 'SSS - Huiswerk WC 4'});
});

// Start de server
app.listen(3000, function(){
  console.log('App listening at http://localhost:3000');
});
