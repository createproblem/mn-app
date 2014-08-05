/* jshint camelcase: false */
'use strict';

var Service = require('./service');
var movie   = require('../models/movie');

function MovieService() {
  this.createFromTmdb = function(data, user, callback) {
    this.model.create({
      tmdb_id: data.id,
      user: user,
      title: data.title,
      overview: data.overview,
      poster_path: data.poster_path,
      release_date: data.release_date,
      posters: data.images.posters.map(function(poster) { return poster.file_path; }),
      backdrops: data.images.backdrops.map(function(backdrop) { return backdrop.file_path; }),
      trailers: data.trailers.youtube
    }, callback);
  };
}

MovieService.prototype = new Service(movie);

module.exports = new MovieService();
