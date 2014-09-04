'use strict';

angular.module('mnApp.services').factory('Movie', ['$resource',
  function($resource) {
    return $resource('/movies/:id', {}, {
      'searchTmdb': {method: 'GET', url: '/search/tmdb'},
      'add': {method: 'POST', isArray: false},
      'query': {method: 'GET', isArray: true},
      'labels': {method: 'GET', url: '/labels', isArray: true},
      'update': {method: 'PUT'}
    });
  }]);
