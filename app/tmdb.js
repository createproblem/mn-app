/* jshint camelcase: false */
'use strict';

var tmdb = {};
var request = require('request');

tmdb.initialize = function(apiKey) {
  tmdb.apiKey = apiKey;
  tmdb.baseUrl = 'http://api.themoviedb.org/3';
  tmdb.apiHeaders = {
    'Accept': 'application/json'
  };
};

tmdb.configuration = function(callback) {
  request({
    method: 'GET',
    url: tmdb.baseUrl + '/configuration',
    headers: tmdb.apiHeaders,
    qs: {
      api_key: tmdb.apiKey
    }
  }, function(err, res, body) {
     callback(body);
  });
};

tmdb.search = function(query, callback) {
  request({
    method: 'GET',
    url: tmdb.baseUrl + '/search/movie',
    headers: tmdb.apiHeaders,
    qs: {
      api_key: tmdb.apiKey,
      query: query
    }
  }, function(err, res, body) {
    callback(body);
  });
};

tmdb.movie = function(id, callback) {
  request({
    method: 'GET',
    url: tmdb.baseUrl + '/movie/' + id,
    headers: tmdb.apiHeaders,
    qs: {
      api_key: tmdb.apiKey,
      append_to_response: 'trailers,images'
    }
  }, function(err, res, body) {
    callback(body);
  });
};

module.exports = tmdb;
