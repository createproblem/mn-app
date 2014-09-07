'use strict';

angular.module('mnApp.directives').directive('youtube', ['$sce',
  function($sce) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {code:'='},
      templateUrl: 'templates/youtube.html',
      link: function ($scope) {
        $scope.$watch('code', function(val) {
          if (val) {
            $scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + val);
          }
        });
      }
    };
  }]);
