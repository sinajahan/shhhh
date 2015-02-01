'use strict';

/**
 * @ngdoc service
 * @name shhhhApp.soundMeter
 * @description
 * Meter class that generates a number correlated to audio volume.
 * The meter class itself displays nothing, but it makes the
 * instantaneous and time-decaying volumes available for inspection.
 * It also reports on the fraction of samples that were at or near
 * the top of the measurement range.
 *
 * Service in the shhhhApp.
 */
angular.module('shhhhApp')
  .service('SoundMeter', ['AudioContext', function SoundMeter(AudioContext) {

    this.context = AudioContext;
    this.instant = 0.0;
    this.slow = 0.0;
    this.clip = 0.0;
    this.script = this.context.createScriptProcessor(2048, 1, 1);
    var that = this;
    this.script.onaudioprocess = function(event) {
      var input = event.inputBuffer.getChannelData(0);
      var i;
      var sum = 0.0;
      var clipcount = 0;
      for (i = 0; i < input.length; ++i) {
        sum += input[i] * input[i];
        if (Math.abs(input[i]) > 0.99) {
          clipcount += 1;
        }
      }
      that.instant = Math.sqrt(sum / input.length);
      that.slow = 0.95 * that.slow + 0.05 * that.instant;
      that.clip = clipcount / input.length;
    };

    this.connectToSource = function(stream) {
      console.log('SoundMeter connecting');
      this.mic = this.context.createMediaStreamSource(stream);
      this.mic.connect(this.script);
      // necessary to make sample run, but should not be.
      this.script.connect(this.context.destination);
    };

    this.stop = function() {
      this.mic.disconnect();
      this.script.disconnect();
    };

  }
]);
