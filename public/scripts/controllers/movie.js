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
      var data = $scope.labelBox[movie._id].data;
      if (data.length === 0) {
        movie.labels = [];
      } else {
        movie.labels = $scope.labelBox[movie._id].data.split(',').map(function(name) {return {name: name};});
      }
      movie.$update({id: movie._id});
    };

    $scope.toggleLabelBox = function(movie) {
      if ($scope.labelBox[movie._id] === undefined) {
        $scope.labelBox[movie._id] = {css: 'fa-save', box: true, data: []};
        $scope.labelBox[movie._id].data = movie.labels.map(function(label) {return label.name;}).join(',');
      } else if ($scope.labelBox[movie._id].box === false) {
        $scope.labelBox[movie._id].css = 'fa-save';
        $scope.labelBox[movie._id].box = true;
      } else {
        $scope.labelBox[movie._id].css = 'fa-tag';
        $scope.labelBox[movie._id].box = false;
        save(movie);
      }
    };
  }]);
