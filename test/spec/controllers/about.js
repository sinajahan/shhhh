'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('shhhhApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutCtrl', {
      $scope: scope
    });
  }));

  it('should do something', function () {
    expect(!!AboutCtrl).toBe(true);
  });
});
