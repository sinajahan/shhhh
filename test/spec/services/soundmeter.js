'use strict';

describe('Service: SoundMeter', function () {

  // load the service's module
  beforeEach(function() {
    module('shhhhApp');
    module(function($provide) {
      var mock = { createScriptProcessor: function() { return {}} };
      $provide.value('AudioContext', mock);
    });
  });

  // instantiate service
  var soundMeter;
  beforeEach(inject(function ($injector) {
    soundMeter = $injector.get('SoundMeter');
  }));

  it('should do something', function () {
    expect(!!soundMeter).toBe(true);
  });

});
