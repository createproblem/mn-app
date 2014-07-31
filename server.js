// modules =======================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var passport       = require('passport');
var session        = require('express-session');

// configuration =================
var config = require('./config/config');
var port = process.env.PORT || 8080;

mongoose.connect(config.database.dsn);
require('./config/passport.js')(passport, config.passport);

app.use(bodyParser.json());
app.use(bodyParser.json({ ttpe: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'mysecret', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/.tmp'));
app.use(morgan('dev'));

// routes ========================
require('./app/routes')(app, passport);

// start =========================
app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;
