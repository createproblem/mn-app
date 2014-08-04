/* jshint camelcase: false */
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
  trailers: Array,
  posters: Array,
  backdrops: Array,
  release_date: Date,
  created_at: { type: Date, default: Date.now }
});

movieSchema.index({tmdb_id: 1, user: 1}, {unique: true});

module.exports = mongoose.model('Movie', movieSchema);
