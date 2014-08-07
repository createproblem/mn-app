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

module.exports = mongoose.model('Movie', movieSchema);
