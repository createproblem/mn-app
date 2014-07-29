'use strict';

describe('Controller: MainCtrl', function() {
  beforeEach(module('mnApp'));

  var MainCtrl, scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should print dump text', function() {
    expect(scope.message).toBe('This is Angular, Bitch!');
  });
});
