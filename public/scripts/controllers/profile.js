'use strict';

angular.module('mnApp.controllers').controller('ProfileCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.user = User.query();
  }]);
