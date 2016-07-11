var express = require('express');
var router = express.Router();

var cars = [
  {
    brand: "Toyota",
    model: "Celica"
  },
  {
    brand: "Ferrari",
    model: "F40"
  },
  {
    brand: "Tesla",
    model: "X"
  },
  {
    brand: "BMW",
    model: "i118"
  },
  {
    brand: "Audi",
    model: "A4"
  }
];


/* GET cars list. */
router.get('/', function(req, res, next) {
  res.locals.cars = cars; //Cars object wordt beschikbaar gemaakt in ejs templates
  res.render('cars/index');
});

/* GET one car by index */
router.get('/:index', function(req, res, next){
        res.locals.car = null; //car (in view>show) is niet bekend, tenzij:
        cars.forEach(function(car){ //ga langs elke auto in de array
        if (car.brand == req.params.index){ //als een van die auto's gelijk is aan wat ingevoerd is (achter de url),
        res.locals.car = car; //dan is car (in view>show) gelijk aan de betreffende auto (die dus ingevoerd/geteld is)
        }
    });
        res.locals.path = req.params.index; //path (in view>show) is gelijk aan het ingevoerde (achter de url)
        res.render('cars/show');
    });

module.exports = router;
