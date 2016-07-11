var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var myConnection = require('express-myconnection');

// Create routes for the following URL's

// [GET] /users
router.get('/', function(req, res, next){
    // Try to use the database, pass an error if something fails
        req.getConnection(function(err, connection){
        if (err) return next(err);
        // Run a query on the database, pass an error if something fails
        connection.query('SELECT * FROM users', function(err, result) {
        if (err){return next(err);};
        // Pass the result (if any) to the template
        console.log(result);
        res.locals.users = result;
        res.locals.title = 'users';
        res.render('users/index');
    });
  });
});

module.exports = router;
