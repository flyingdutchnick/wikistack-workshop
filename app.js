var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var makeRouter = require('./routes/wiki')

var bodyParser= require("body-parser");

var models = require('./models');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var server = app.listen(3001);

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    server.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);




app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});



app.use('/wiki', makeRouter);

// app.listen(3001, function(){
// 	console.log('server listening on 3001')
// });