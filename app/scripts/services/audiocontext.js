'use strict';

/**
 * @ngdoc service
 * @name shhhhApp.audioContext
 * @description
 * # audioContext
 * Service in the shhhhApp.
 */
angular.module('shhhhApp')
  .service('AudioContext', ['$window', function AudioContext($window) {

    try {
      return new $window.webkitAudioContext();
    } catch (e) {
      console.error('Web Audio API not supported.');
    }
  }]);
