//Bottom layer (de bodem) vanaf hier
// Express en path zijn hier nodig
var express = require('express');
var path = require('path');

// Routers
var indexRouter = require('./routes/index'); //Haal index module op, vanuit ander bestand.
var carsRouter = require('./routes/cars'); //haal cars module op

// App setup/bouwen
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // de views zitten in de map die 'views' heet en ejs path.join plakt 'views' achter directories
app.set('view engine', 'ejs'); // view engine, gebruik ejs, dat is onze templating taal

// Middleware (de tussenlaag) een functie die je met app.use kan doorgeven
// Elk stukje middelware is gewoon nog een request handler. Start met het kijken naar de eerste request handler en dan naar de volgende (next) en de volgende, enz.
// Je start met de topmost (bovenste) Middleware (oftewel belangrijkste) en werkt vanaf daar naar beneden = wat nog rest
// Er zijn standaard Middleware (functies) binnen Express die je kan gebruiken/aanroepen
// Connect routers to routes
app.use('/', indexRouter);
app.use('/cars', carsRouter);

/* 404'd: gebruiker doet iets fout! foute url?
app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!\n");
});*/

// Routing is de Top Layer app.all, app.get enz.

//Start de  server, voor bevestiging als het werkt: een bericht in je console
//app.listen() is verkorte code voor http.createServer.(app).listen()
app.listen(3000, function(){
  console.log("Started on port 3000");
});
