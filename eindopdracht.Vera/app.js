//Bottom layer (de bodem) vanaf hier
var express = require('express');
var session = require('express-session');
var bodyParser = require("body-parser");
var path = require('path');
var multer  = require('multer');
var mysql = require('mysql');
var myConnection = require('express-myconnection');
var fs = require('fs');

// App setup/bouwen
var app = express();

// Routers
var fileRoutes = require('./routes/files');
var userRouter = require('./routes/users');

// Tell multer to store any uploaded files in the uploads subdirectory in your project.
var upload = multer({dest: 'public/uploads/'});
                   //limits: {fileSize: 1000000, files:1});

// view engine setups
app.set('views', path.join(__dirname, 'views')); // de views zitten in de map die 'views' heet
app.set('view engine', 'ejs'); // view engine, gebruik ejs, dat is onze templating taal

//Connect to MYSQL
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'student',
    password: 'serverSide',
    port: 3306,
    database: 'student'
    }, 'single'));

// Setup serving static assets
app.use(express.static('public'));

// Een functie die je met app.use kan doorgeven
// User body parser for POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Add session support
app.use(session({
  secret: 'jajajajajaja.123.nu', // Customize this string for security!
  saveUninitialized: true,
  resave: false
}));

// Connect routers to routes
// Setup initial routing - index
app.use('/files', upload.single('yourfile'), fileRoutes);
app.use('/users', userRouter);
//app.use('admin'. adminRoutes);//
//app.use(errorRouter); // If no routes handled the request, we clearly have an error

app.get('/', function(req, res) {
  req.getConnection(function (err, connection){
  connection.query('SELECT * FROM comments', function(err, results){
    res.locals.comments = results;
    fs.readdir('public/uploads/', function(err, files) {
      if(err) return next(err);
      res.locals.files = files;
      res.render('index', {
        message: ''})
      });
    });
  });
});


// Start the server, voor bevestiging als het werkt: een bericht in je console
app.listen(3000, function(){
  console.log('App listening at http://localhost:3000');
});
