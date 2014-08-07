/*jshint curly: false */
'use strict';

var util           = require('util');
var BaseController = require('./base');
var model          = require('../models/movie');
var tmdb           = require('../services/tmdb');

function Movie(model) {
  this.model = model;
  this.getMovies = function(user, callback) {
    this.model.find({user: user}).populate('labels', 'name').exec(function(err, movies) {
      if (err) return this.errorHandler(err);

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

module.exports = new Movie(model);
