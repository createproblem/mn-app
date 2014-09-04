'use strict';

angular.module('mnApp.directives').directive('youtube', ['$sce',
  function($sce) {
    return {
      restrict: 'EA',
      scope: {code:'='},
      template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
      link: function ($scope) {
        $scope.$watch('code', function(val) {
          if (val) {
            $scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + val);
          }
        });
      }
    };
  }]);
