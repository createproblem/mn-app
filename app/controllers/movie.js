/*jshint curly: false */
'use strict';

var util           = require('util');
var BaseController = require('./base');
var model          = require('../models/movie');
var tmdb           = require('../services/tmdb');

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

module.exports = new Movie(model);
