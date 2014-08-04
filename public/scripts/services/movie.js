'use strict';

angular.module('mnApp.services').factory('Movie', ['$resource',
  function($resource) {
    return $resource('/movies', {}, {
      'searchTmdb': {method: 'GET', url: '/movies/search-tmdb'},
      'add': {method: 'POST', isArray: false}
    });
  }]);
