var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 
module.exports = router;

// router.get('/', function(req,res,next){
// 	res.send('hello')
// });

router.get('/', function(req, res, next){
	// var allPages = //query from database

	Page.findAll({
	})
	.then(function(pages){
		res.render('index', {
			pages
		})
  	}).catch(next) 
	// res.redirect('/')
	//res.send();
})

router.get('/users', function(req, res, next) {
  
 	User.findAll({ 
 	})
  	.then(function(users){
    res.render('users', { 
    		users 
    	})
  	}).catch(next)
});

router.get('/users/:id', function(req, res, next){
	// var allPages = //query from database

	var user = User.findOne({
		where:{
			id: url.params.id
		}
	});


	var pages = Page.findAll({
		where:{ 
			authorid:  req.params.id
		}
	});

	Promises.all([user, pages])
	.then(function(user, pages){
		res.render('usersPage', {
			user, pages
		})
  	}).catch(next) 
	// res.redirect('/')
	//res.send();
})

router.get('/add', function(req, res, next){
	res.render('addpage');
});

router.get('/:pagetitle', function(req, res, next){
	//res.send(req.params.pagetitle);

	Page.findOne({
  		where:{
  			urlTitle: req.params.pagetitle
  		}
	})
	.then(function(foundPage){
		
		res.render('wikipage', { 
		title: foundPage.title,
		content: foundPage.content,
		urlTitle: foundPage.urlTitle
		})
  })
  .catch(next)

});

router.get('/users/:id', function(req,res,next){
	res.send(req.params.id);	
})

router.put('/users/:id', function(req,res,next){
	res.send(req.params.id);
})

router.delete('/users/:id', function(req,res,next){

})

router.post('/', function(req, res, next){
	// res.json(req.body);

	User.findOrCreate({
		where: {
  	  		name: req.body.name,
    		email: req.body.email
  		}
	})
	.then(function (values) {

  	var user = values[0];

	    var page = Page.build({
    		title: req.body.title,
    		content: req.body.content
  		});

  	return page.save().then(function (page) {
    	return page.setAuthor(user);
  	});

	})
	.then(function (page) {
	  res.redirect(page.route);
	})
	.catch(next);



	// var page = Page.build({
	// 	title: req.body.title,
	// 	content: req.body.content
	// })

	// page.save()
	// .then(function(savedPage){
	// 	res.redirect(savedPage.route);
	// }).catch(next);
})



// router.get('/', function(req,res,next){
// 	res.sendFile('views/index.html', { root: __dirname + '/../'});
// });