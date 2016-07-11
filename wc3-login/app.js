//Bottom layer (de bodem) vanaf hier
// Express en path zijn hier nodig
var express = require('express');
var session = require('express-session');
var bodyParser = require("body-parser");
var path = require('path');

// App setup/bouwen
var app = express();

// Routers
//var IndexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');
//var loginRouter = require('.routes/users/login');
//var errorRouter = require('./routes/error');
//var adminRouter = require('./routes/admin');//

// Setup serving static assets
app.use(express.static('public'));

// view engine setups
app.set('views', path.join(__dirname, 'views')); // de views zitten in de map die 'views' heet
app.set('view engine', 'ejs'); // view engine, gebruik ejs, dat is onze templating taal

// Vanaf hier Middleware (de tussenlaag) een functie die je met app.use kan doorgeven
// User body parser for POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Add session support
app.use(session({
  secret: 'hoezo.123.nu', // Customize this string for security!
  saveUninitialized: true,
  resave: false
}));

// Connect routers to routes
// Setup initial routing - index
//app.use('/', IndexRouter);
app.use('/users', usersRouter);
//app.use('/users/login', loginRouter);
//app.use('admin'. adminRoutes);//
//app.use(errorRouter); // If no routes handled the request, we clearly have an error

app.get('/', function(req, res) {
  res.render('index', {title: 'SSS - Exercise 3'});
});

// Start the server, voor bevestiging als het werkt: een bericht in je console
app.listen(3000, function(){
  console.log('App listening at http://localhost:3000');
});
