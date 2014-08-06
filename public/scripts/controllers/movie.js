/* jshint camelcase: false */
'use strict';

angular.module('mnApp.controllers').controller('MovieNewCtrl', ['$scope', 'Movie', 'toaster',
  function($scope, Movie, toaster) {
    $scope.movies = [];
    $scope.search = function(isValid) {
      if (isValid) {
        Movie.searchTmdb({query: this.query}, function(res) {
          $scope.movies = res.results;
        });
      }
    };

    $scope.addMovie = function(tmdbId) {
      Movie.add({tmdbId: tmdbId}, function(response) {
        if (response.name !== undefined) {
          toaster.pop('warning', 'Movie already exists.');
        } else {
          var date = new Date(response.release_date).getFullYear();
          var message = response.title + ' (' + date + ')';
          toaster.pop('success', 'Movie added', message);
        }
      });
    };
  }])
.controller('MovieCtrl', ['$scope', 'Movie',
  function($scope, Movie) {
    $scope.movies = Movie.query();
    $scope.labelBox = {};

    $scope.save = function(movie) {
      console.log(movie);
    };

    $scope.toggleLabelBox = function(movieId) {
      if ($scope.labelBox[movieId] === undefined || $scope.labelBox[movieId].box === false) {
        $scope.labelBox[movieId] = {css: 'fa-save', box: true, data: []};
      } else {
        $scope.labelBox[movieId] = {css: 'fa-tag', box: false, data: []};
      }
    };
  }]);
