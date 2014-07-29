'use strict';

angular.module('mnApp.services').factory('User', ['$resource',
  function($resource) {
    return $resource('/profile', {}, {
      'query': { method: 'GET', isArray: false }
    });
  }]);
