/* jshint camelcase: false */
'use strict';

var auth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.send(401);
  } else {
    next();
  }
};

var MovieCtrl = require('./controllers/movie');
var LabelCtrl = require('./controllers/label');
var ProfileCtrl = require('./controllers/profile');

module.exports = function(app, passport) {
  // Add new movie
  app.post('/movies', auth, function(req, res) {
    MovieCtrl.runAddMovie(req, res);
  });

  // Get all movies
  app.get('/movies', auth, function(req, res) {
    MovieCtrl.run(req, res);
  });

  // Put movie
  app.put('/movies/:id', auth, function(req, res) {
    MovieCtrl.runUpdateMovie(req, res);
  });

  // Get movie
  app.get('/movies/:id', auth, function(req, res) {
    MovieCtrl.runGetMovie(req, res);
  });

  // Get labels
  app.get('/labels', auth, function(req, res) {
    LabelCtrl.run(req, res);
  });

  // tmdb search
  app.get('/search/tmdb', auth, function(req, res) {
    MovieCtrl.runTmdbSearch(req, res);
  });

  // get the user profile
  app.get('/profile', auth, function(req, res) {
    ProfileCtrl.run(req, res);
  });

  // github authentication
  app.get('/auth/github', passport.authenticate('github', {}));

  // handle the callback after github has authenticated the user
  app.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: '/#/profile',
    failureRedirect : '/'
  }));

  // logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // route to test if the user is logged in or not
  app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  // deliver angularjs
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
};
