'use strict';

/**
 * @ngdoc service
 * @name shhhhApp.audioData
 * @description
 * # audioData
 * Service in the shhhhApp.
 */
angular.module('shhhhApp')
  .service('AudioData', ['$rootScope', function AudioData($rootScope) {
    var SIZE = 3;
    var LOUNDESS_MINIMUM_DURATION = 1000;

    this.dataReference = [[0, 0, 0]]; // 2d format for chart
    this.data = this.dataReference[0];
    this.lastData = 0;
    this.limit = 100;

    var that = this;
    var isCurrentlyOver = false;
    var currentlyOverStartedAt;
    var sum = 0;

    this.getLastDataInHundreds = function() {
      return that.lastData * 100;
    };

    this.isNoiseOverLimit = function() {
      return that.getLastDataInHundreds() >= that.limit;
    };

    this.record = function(data, limit) {
      that.lastData = data;
      that.limit = limit;

      if (isCurrentlyOver) {
        sum += data;
      }
      var isOverLimit = that.isNoiseOverLimit();
      if (isOverLimit && !isCurrentlyOver) {
        currentlyOverStartedAt = new Date().getTime();
        isCurrentlyOver = true;
      }

      function durationWasMoreThanMinimum() {
        return (new Date().getTime() - currentlyOverStartedAt) > LOUNDESS_MINIMUM_DURATION;
      }

      if (!isOverLimit && isCurrentlyOver) {
        isCurrentlyOver = false;
        if (sum > that.data[0] && durationWasMoreThanMinimum()) {
          that.data.shift();
          that.data.push(sum);
          that.data.sort();
          $rootScope.$broadcast('top-record');
        }
        sum = 0;
      }
    };

    function getLables() {
      var labels = [];
      for (var i = 0; i < SIZE; i++) {
        labels.push(i + 1);
      }

      return labels;
    }
    this.labels = getLables();
}]);
