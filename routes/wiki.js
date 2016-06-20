var express = require('express');
var router = express.Router();
module.exports = router;

// router.get('/', function(req,res,next){
// 	res.send('hello')
// });

router.get('/', function(req, res, next){
	// var allPages = //query from database
	res.send();
})

router.post('/', function(req, res, next){

	res.send();
})

router.get('/add', function(req, res, next){
	res.render('addpage');
})

// router.get('/', function(req,res,next){
// 	res.sendFile('views/index.html', { root: __dirname + '/../'});
// });