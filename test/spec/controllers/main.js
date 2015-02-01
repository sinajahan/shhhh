'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(function() {
    module('shhhhApp');
    module(function ($provide) {
      $provide.service('SoundMeter', function () { });
      var windowMock = { navigator: { getUserMedia: function() {} } };
      $provide.value('$window', windowMock);
    });
  });

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of options for limit', function () {
    expect(scope.options.length).toBe(12);
  });
});
