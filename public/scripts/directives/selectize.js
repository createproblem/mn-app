'use strict';

angular.module('mnApp.directives').value('selectizeConfig', {})
  .directive('selectize', ['selectizeConfig', 'Movie', '$timeout', function(selectizeConfig, Movie, $timeout) {

  return {
    restrict: 'A',
    require: '^ngModel',
    template: '<input>',
    replace: true,
    scope: {
      ngShow: '='
    },
    link: function($scope, $element, attr, ngModel) {
      var show = function(value) {
        if (value) {
          $element.show();
          $timeout(function() {
            $element.selectize({
              create: true,
              labelField: 'name',
              valueField: 'name',
              searchField: 'name',
              load: function(query, callback) {
                Movie.labels({}, function(response) {
                  callback(response);
                });
              }
            });
            $element[0].selectize.focus();
          });
        } else {
          if ($element[0].selectize !== undefined) {
            $element[0].selectize.destroy();
          }
          $element.hide();
        }
      };

      if (attr.hasOwnProperty('ngShow')) {
        $scope.$watch('ngShow', show);
      }
    }
  };
}]);
