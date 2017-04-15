var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser')
var passport = require('passport')
var morgan = require('morgan');
var path = require('path');
var routes = express.Router();

//
//route to your index.html
//
var assetFolder = path.resolve(__dirname, './client/');
routes.use(express.static(assetFolder));

var app = express();

app.use(morgan('dev'));
app.use(session({
	secret: "mysecretkey",	
	resave: false,
	saveUninitialized: false
}))

app.use(bodyParser.urlencoded({
  extended: true
}));

var config = require("./server/config/config")
var authUserMiddleware = require('./server/middlewares/auth_user_middleware')

require('./server/auth/passport')(config, passport)

app.use(passport.initialize())
app.use(passport.session())

require('./server/auth/auth')(config, passport, app)

app.use(function (req, res, next) {
  authUserMiddleware(req, res, next)
})

var secure = express.Router();
require('./server/auth/secure')(secure)
app.use("/api/", secure)

app.get('/', function(req, res){
  res.sendFile( assetFolder + '/index.html' )
})

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server running on port: ' + port);