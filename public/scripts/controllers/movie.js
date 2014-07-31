'use strict';

angular.module('mnApp.controllers').controller('MovieNewCtrl', ['$scope', 'Movie',
  function($scope, Movie) {
    $scope.movies = [{"adult":false,"backdrop_path":"/hNFMawyNDWZKKHU4GYCBz1krsRM.jpg","id":550,"original_title":"Fight Club","release_date":"1999-10-14","poster_path":"/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg","popularity":6.31019124342994,"title":"Fight Club","vote_average":7.7,"vote_count":2932},{"adult":false,"backdrop_path":"/qw2Qb42xtyE1B449JoTgb1mVCe1.jpg","id":51021,"original_title":"Lure: Teen Fight Club","release_date":"2010-11-16","poster_path":"/aRTX5Y52yGbVL6TGnyI4E8jjtz4.jpg","popularity":0.616808163582943,"title":"Lure: Teen Fight Club","vote_average":2,"vote_count":1},{"adult":false,"backdrop_path":null,"id":151912,"original_title":"Jurassic Fight Club","release_date":"2008-10-22","poster_path":"/AwECEjjen4eYSDZ3AETXnFG6dgu.jpg","popularity":0.608842857778564,"title":"Jurassic Fight Club","vote_average":0,"vote_count":0},{"adult":false,"backdrop_path":"/tcoAGvTo96R7Y9ZGVCCz7BZvrvb.jpg","id":104782,"original_title":"Florence Fight Club","release_date":"2010-01-01","poster_path":"/eQqqu0srTYcclWqylvgpLyU87hV.jpg","popularity":0.552869307387319,"title":"Florence Fight Club","vote_average":0,"vote_count":0},{"adult":false,"backdrop_path":null,"id":259016,"original_title":"Insane Fight Club","release_date":"2014-03-11","poster_path":"/mLhwBQPV3iATe3L61kbpmxANwL8.jpg","popularity":0.346909587634787,"title":"Insane Fight Club","vote_average":0,"vote_count":0},{"adult":false,"backdrop_path":null,"id":209599,"original_title":"Brooklyn Girls Fight Club","release_date":"","poster_path":"/luWpP5WSw9JjbWS1J4BMnjkkJCX.jpg","popularity":0.29863276930561,"title":"Brooklyn Girls Fight Club","vote_average":3.5,"vote_count":1},{"adult":false,"backdrop_path":null,"id":115584,"original_title":"Fight Club – The “I am Jack’s Laryngitis” Edit","release_date":"","poster_path":null,"popularity":0.198971097077892,"title":"Fight Club – The “I am Jack’s Laryngitis” Edit","vote_average":0,"vote_count":0},{"adult":false,"backdrop_path":"/5Z0FScA1bB6EbdGmZCUBeUk32eV.jpg","id":14476,"original_title":"Clubbed","release_date":"2009-01-16","poster_path":"/ssIN8GQMSxz1DKMZUiJJlvdhmL4.jpg","popularity":0.222539187636687,"title":"Clubbed","vote_average":7.8,"vote_count":11},{"adult":false,"backdrop_path":"/kgAgwIqkGMjrvZ6H8rLOgh65f4.jpg","id":219897,"original_title":"Barrio Brawler","release_date":"2013-08-27","poster_path":"/8AyCFlw1d856UAAN21fnWOpQu4l.jpg","popularity":0.00532408570345791,"title":"Barrio Brawler","vote_average":1.5,"vote_count":2}];

    $scope.search = function(isValid) {
      if (isValid) {
        Movie.searchTmdb({query: this.query}, function(res) {
          $scope.movies = res.results;
        });
      }
    };
  }]);
