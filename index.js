var express = require('express');
var app = express();
var controller = require('./js/controller');
app.set('view engine','ejs');
app.use(express.static('./js'));
controller(app);
app.listen(3000);