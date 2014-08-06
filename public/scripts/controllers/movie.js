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

    var save = function(movie) {
      movie.$update({id: movie.id});
    };

    $scope.toggleLabelBox = function(movie) {
      if ($scope.labelBox[movie.id] === undefined || $scope.labelBox[movie.id].box === false) {
        $scope.labelBox[movie.id] = {css: 'fa-save', box: true, data: []};
      } else {
        $scope.labelBox[movie.id] = {css: 'fa-tag', box: false, data: []};
        save(movie);
      }
    };
  }]);
