'use strict';

var util = require('util');
var BaseController = require('./base');
var model = require('../models/movie');

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

Movie.prototype.run = function(req, res, next) {
  this.getMovies(req.user, function(movies) {
    res.json(movies);
  });
};

module.exports = new Movie(model);
