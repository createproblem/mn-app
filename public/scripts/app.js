'use strict';

angular.module('mnApp', [
  'ngRoute',
  'ngResource',
  'mm.foundation',
  'mnApp.services',
  'mnApp.controllers'
]).config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
    .when('/profile', { templateUrl: 'views/profile.html', controller: 'ProfileCtrl' })
    .when('/login', { templateUrl: 'views/login.html', controller: 'LoginCtrl' })
    .when('/movie/new', { templateUrl: 'views/movie-new.html', controller: 'MovieNewCtrl' })
  ;

  var interceptor = ['$q', '$location',
  function($q, $location) {
    return function(promise) {
      return promise.then(
        function(response) {
          return response;
        },
        function(response) {
          if (response.status === 401) {
            $location.url('/login');
          }
          return $q.reject(response);
        }
      );
    };
  }];

  $httpProvider.responseInterceptors.push(interceptor);
});
