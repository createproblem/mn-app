/*jshint curly: false */
'use strict';

var util           = require('util');
var BaseController = require('./base');
var model          = require('../models/movie');
var tmdb           = require('../services/tmdb');
var Label          = require('../models/label');

function Movie(model) {
  this.model = model;
  this.getMovies = function(user, callback) {
    var self = this;
    this.model.find({user: user}).populate('labels', 'name').exec(function(err, movies) {
      if (err) return self.errorHandler(err);

      callback(movies);
    });
  };
}

util.inherits(Movie, BaseController);

Movie.prototype.run = function(req, res) {
  this.getMovies(req.user, function(movies) {
    res.json(movies);
  });
};

Movie.prototype.runTmdbSearch = function(req, res) {
  var query = req.query.query;
  tmdb.search(query, function(response) {
    res.json(JSON.parse(response));
  });
};

Movie.prototype.runAddMovie = function(req, res) {
  var tmdbId = req.body.tmdbId;
  var self = this;

  tmdb.movie(tmdbId, function(response) {
    var movieData = JSON.parse(response);
    self.model.createFromTmdb(movieData, req.user, function(err, movie) {
      if (err) return self.errorHandler(err);

      res.json(movie);
    });
  });
};

Movie.prototype.runUpdateMovie = function(req, res) {
  var self = this;

  this.model.findOne({_id: req.params.id, user: req.user}, function(err, movie) {
    if (err) return self.errorHandler(err);

    var labelsRaw = req.body.labels.map(function(label) {return label.name;});

    // reset labels
    movie.labels = [];

    // find existing labesl and add
    Label.find({name: {$in: labelsRaw}}, function(err, labelsExist) {
      movie.labels = labelsExist;

      // remove found labels from raw
      labelsExist.forEach(function(label) {
        var idx = labelsRaw.indexOf(label.name);
        if (idx !== -1) {
          labelsRaw.splice(idx, 1);
        }
      });

      // create new labels
      var newLabels = labelsRaw.map(function(name) {
        return {
          name: name,
          user: req.user
        };
      });

      Label.create(newLabels, function(err) {
        if (err) return self.errorHandler(err);

        for (var i = 1; i < arguments.length; i++) {
          movie.labels.push(arguments[i]);
        }

        // save movie
        movie.save(function(err, movieUpdated) {
          if (err) return self.errorHandler(err);

          self.model.findOne({_id: movieUpdated._id}).populate('labels').exec(function(err, movieNew) {
            res.json(movieNew);
          });
        });
      });
    });
  });
};

module.exports = new Movie(model);
