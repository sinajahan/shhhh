'use strict';

describe('Service: audioData', function () {

  // load the service's module
  beforeEach(module('shhhhApp'));

  // instantiate service
  var audioData;
  beforeEach(inject(function ($injector) {
    audioData = $injector.get('AudioData');
  }));

  it('should do something', function () {
    expect(!!audioData).toBe(true);
  });

});
