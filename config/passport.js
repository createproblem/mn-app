'use strict';

var GithubStrategy = require('passport-github').Strategy;
var User = require('../app/models/user');

module.exports = function(passport, config) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // github
  passport.use(new GithubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: '/auth/github/callback'
  }, function(token, refreshToken, profile, done) {
    // async
    process.nextTick(function() {
      User.findOne({'github.id': profile.id}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();

          newUser.github.id = profile.id;
          newUser.github.token = token;
          newUser.github.email = profile.emails[0].value;

          newUser.save(function(err) {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));
};
