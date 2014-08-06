/* jshint camelcase: false */
'use strict';

var auth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.send(401);
  } else {
    next();
  }
};

var getQuery = function(url) {
  var urlParser = require('url');
  var urlParts = urlParser.parse(url, true);
  return urlParts.query;
};

var ms = require('./services/movieService');
var ls = require('./services/labelService');

module.exports = function(app, passport, tmdb) {
  // Add new movie
  app.post('/movies', auth, function(req, res) {
    var tmdbId = req.body.tmdbId;
    tmdb.movie(tmdbId, function(data) {
      ms.createFromTmdb(data, req.user, function(err, movie) {
        if (err) {
          res.send(err);
        } else {
          res.json(movie);
        }
      });
    });
  });

  // Get all movies
  app.get('/movies', auth, function(req, res) {
    ms.model.find({user: req.user}, function(err, movies) {
      if (err) {
        res.send(err);
      } else {
        res.json(movies);
      }
    });
  });

  // Get labels
  app.get('/labels', auth, function(req, res) {
    ls.model.find({user: req.user}, function(err, labels) {
      if (err) {
        res.send(err);
      } else {
        res.json(labels);
      }
    })
  });

  // tmdb search
  app.get('/movies/search-tmdb', auth, function(req, res) {
    var query = getQuery(req.url).query;

    tmdb.search(query, function(body) {
      res.send(body);
    });
  });

  // get the user profile
  app.get('/profile', auth, function(req, res) {
    res.json(req.user);
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
