/* jshint camelcase: false */
'use strict';

var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  tmdb_id: Number,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    index: true
  },
  title: String,
  overview: String,
  poster_path: String,
  labels: [{ type: mongoose.Schema.ObjectId, ref: 'Label', index: true }],
  trailers: Array,
  posters: Array,
  backdrops: Array,
  release_date: Date,
  created_at: { type: Date, default: Date.now }
});

movieSchema.index({tmdb_id: 1, user: 1}, {unique: true});

movieSchema.methods.toJSON = function() {
  var obj = this.toObject();

  delete obj.posters;
  delete obj.backdrops;
  delete obj.user;
  delete obj.__v;
  delete obj._id;

  return obj;
};

movieSchema.statics.createFromTmdb = function(data, user, callback) {
  return mongoose.Model.create.call(this.model('Movie'), {
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

module.exports = mongoose.model('Movie', movieSchema);
