'use strict';

var auth = function(req, res, next) {
  if (!req.isAuthenticated())
    res.send(401);
  else
    next();
};

module.exports = function(app, passport) {
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
