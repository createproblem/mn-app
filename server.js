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
var RedisStore     = require('connect-redis')(session);

// configuration =================
var config = require('./config/config')(process.env);
var port = process.env.PORT || 8080;
var tmdb = require('./app/services/tmdb');

mongoose.connect(config.database.dsn);
require('./config/passport.js')(passport, config.passport);
tmdb.initialize(config.api.tmdb.apiKey);

app.use(bodyParser.json());
app.use(bodyParser.json({ ttpe: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ store: new RedisStore({
  host: config.redis.host,
  port: config.redis.port,
  pass: config.redis.password
}), secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/dist'));
  app.use(morgan('combined'));
} else {
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/.tmp'));
  app.use(morgan('dev'));
}

// routes ========================
require('./app/routes')(app, passport, tmdb);

// start =========================
app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;
