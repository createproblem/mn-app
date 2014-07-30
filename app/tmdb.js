/* jshint camelcase: false */
'use strict';

module.exports = function(apiKey) {
  var request = require('request');
  var baseUrl = 'http://api.themoviedb.org/3';
  var apiHeaders = {
    'Accept': 'application/json'
  };

  this.getConfiguration = function(callback) {
    request({
      method: 'GET',
      url: baseUrl + '/configuration',
      headers: apiHeaders,
      qs: {
        api_key: apiKey
      }
    }, function(err, res, body) {
       callback(body);
    });
  };

  this.search = function(query, callback) {
    request({
      method: 'GET',
      url: baseUrl + '/search/movie',
      headers: apiHeaders,
      qs: {
        api_key: apiKey,
        query: query
      }
    }, function(err, res, body) {
      callback(body);
    });
  };
};
