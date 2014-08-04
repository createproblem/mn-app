'use strict';

angular.module('mnApp', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'toaster',
  'mm.foundation',
  'mnApp.services',
  'mnApp.controllers'
]).config(function($routeProvider, $httpProvider) {
  var checkLoggedin = ['$q', '$timeout', '$http', '$location', '$rootScope',
    function($q, $timeout, $http, $location, $rootScope) {
      var deferred = $q.defer();
      $http.get('/loggedin').success(function(user) {
        if (user !== '0') {
          $timeout(deferred.resolve, 0);
        } else {
          $rootScope.message = 'You need to log in.';
          $timeout(function() { deferred.reject(); }, 0);
          $location.url('/login');
        }
      });
    }];

  $routeProvider
    .when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .when('/login', { templateUrl: 'views/login.html', controller: 'LoginCtrl' })
    .when('/movies', {
      templateUrl: 'views/movies.html',
      controller: 'MovieCtrl',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .when('/movie/new', {
      templateUrl: 'views/movie-new.html',
      controller: 'MovieNewCtrl',
      resolve: {
        loggedin: checkLoggedin
      }
    });

  var interceptor = ['$q', '$location', function($q, $location) {
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
