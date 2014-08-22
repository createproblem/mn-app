/* jshint camelcase: false */
'use strict';

angular.module('mnApp.controllers').controller('MovieNewCtrl', ['$scope', 'Movie', 'toaster', 'progress',
  function($scope, Movie, toaster, progress) {
    $scope.movies = [];
    $scope.search = function(isValid) {
      if (isValid) {
        progress.register('tmdb-lookup');
        Movie.searchTmdb({query: this.query}, function(res) {
          $scope.movies = res.results;
          progress.done('tmdb-lookup');
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
.controller('MovieCtrl', ['$scope', 'Movie', 'progress',
  function($scope, Movie, progress) {
    progress.register('load-movies');
    progress.register('load-labels');

    $scope.labelBox = {};
    $scope.sLabels = [];

    $scope.movies = Movie.query(function(res) {
      progress.done('load-movies');
    });

    $scope.labels = Movie.labels(function(res) {
      progress.done('load-labels');
    });

    var save = function(movie) {
      var data = $scope.labelBox[movie._id].data;
      if (data.length === 0) {
        movie.labels = [];
      } else {
        movie.labels = $scope.labelBox[movie._id].data.split(',').map(function(name) {return {name: name};});
      }

      movie.$update({id: movie._id}, function(res) {
        $scope.labels = Movie.labels();
      });
    };

    $scope.toggleLabelSelection = function(labelName) {
      var idx = $scope.sLabels.indexOf(labelName);
      if (idx > -1) {
        $scope.sLabels.splice(idx, 1);
      } else {
        $scope.sLabels.push(labelName);
      }
    };

    $scope.resetLabelSelection = function() {
      $scope.sLabels.splice(0, $scope.sLabels.length);
    };

    $scope.isLabelSelected = function(labelName) {
      // console.log('message');
      return $scope.sLabels.indexOf(labelName) !== -1;
      // return true;
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
