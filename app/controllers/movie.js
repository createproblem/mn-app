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

    var labelsRaw = req.body.labels.map(function(label) {return label.name});

    Label.find({name: labelsRaw}, function(err, labelsFound) {
      if (err) return self.errorHandler(err);

      labelsFound.forEach(function(label) {
        var idx = labelsRaw.indexOf(label.name);
        if (idx !== -1) {
          labelsRaw.splice(idx, 1);
        }
      });

      var labelsNew = labelsRaw.map(function(labelName) { return {name: labelName, user: req.user}});
      Label.create(labelsNew, function(err, labels) {
        if (err) return self.errorHandler(err);

        movie.labels = [];
        if (labels !== undefined) {
          for (var i = 0; i < labels.length; i++) {
            movie.labels.push(labels[i]);
          }
        }

        for (var i = 0; i < labelsFound.length; i++) {
          movie.labels.push(labelsFound[i]);
        }

        console.log(movie);
        movie.save(function(err, movie) {
          if (err) return self.errorHandler(err);

          self.model.findOne({_id: movie._id}).populate('labels').exec(function(err, movie) {
            if (err) return self.errorHandler(err);
            res.json(movie);
          });
        });
      });
    });
  });
};

module.exports = new Movie(model);
