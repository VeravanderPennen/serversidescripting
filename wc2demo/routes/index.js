var express = require('express'); //dit is de module
var router = express.Router();

/* GET home page. */ // index.js wordt de module
router.get('/', function(req, res, next) {
  res.locals.title = "Home"; // er zit een variabele in de response. locals zorgt ervoor dat je in je template slechts title hoeft in te voeren
  res.render('index'); //titel wordt doorgegeven aan template (view>)index
});

module.exports = router; // note geeft hiermee functie/object terug.
//exporteer router object als module naar waar hij ge"get" wordt.

// de router binnen var index
