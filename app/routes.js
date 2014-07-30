'use strict';

var auth = function(req, res, next) {
  if (!req.isAuthenticated())
    res.send(401);
  else
    next();
};

var getQuery = function(url) {
  var urlParser = require('url');
  var urlParts = urlParser.parse(url, true);
  return urlParts.query;
}

var tmdb = require('./tmdb');

module.exports = function(app, passport) {
  // tmdb search
  app.get('/movies/search-tmdb', function(req, res) {
    var query = getQuery(req.url).query;
    var a = new tmdb('xxx');
    console.log(query);
    a.search(query, function(body) {
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

  // deliver angularjs
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
};
