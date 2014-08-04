'use strict';

angular.module('mnApp.controllers').controller('MovieNewCtrl', ['$scope', 'Movie',
  function($scope, Movie) {
    $scope.movies = [];

    $scope.search = function(isValid) {
      if (isValid) {
        Movie.searchTmdb({query: this.query}, function(res) {
          $scope.movies = res.results;
        });
      }
    };

    $scope.addMovie = function(tmdbId) {
      Movie.add({tmdbId: tmdbId});
    };
  }]);
