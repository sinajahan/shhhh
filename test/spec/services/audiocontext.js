'use strict';

describe('Service: audioContext', function () {

  // load the service's module
  beforeEach(module('shhhhApp'));

  // instantiate service
  var audioContext;
  beforeEach(function() {
    inject(function($injector) {
      audioContext = $injector.get('AudioContext');
    });
  });

  it('should do something', function () {
    expect(!!audioContext).toBe(true);
  });

});
