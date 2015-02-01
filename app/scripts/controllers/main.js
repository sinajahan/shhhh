'use strict';

/**
 * @ngdoc function
 * @name shhhhApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shhhhApp
 */
angular.module('shhhhApp')
  .controller('MainCtrl', ['$window', '$scope', '$interval', 'SoundMeter', 'AudioData',
                  function ($window, $scope, $interval, SoundMeter, AudioData) {


  $scope.labels = AudioData.labels;
  $scope.series = ['Top Volume'];
  $scope.data = AudioData.dataReference;
  $scope.slowMeter = AudioData.lastData;

  $scope.showTopThreeAlert = false;
  $scope.isNoiseOverLimit = AudioData.isNoiseOverLimit;

  function updateData(data) {
    AudioData.record(data.instant, $scope.limit.value);
  }

  $scope.options = [
    { label: '3%', value: 3 },
    { label: '5%', value: 5 },
    { label: '10%', value: 10 },
    { label: '20%', value: 20 },
    { label: '30%', value: 30 },
    { label: '40%', value: 40 },
    { label: '50%', value: 50 },
    { label: '60%', value: 60 },
    { label: '70%', value: 70 },
    { label: '80%', value: 80 },
    { label: '90%', value: 90 },
    { label: '100%', value: 100 },
  ];

  $scope.limit = $scope.options[0];

  $scope.$on('top-record', function() {
    $scope.showTopThreeAlert = true;

    $window.setTimeout(function() {
      $scope.showTopThreeAlert = false;
    }, 2000);
  });

  $scope.getTotal = function() {
    return 100;
  };

  $scope.getData = function() {
    return AudioData.lastData * 100;
  };


  // Put variables in global scope to make them available to the browser console.
  var constraints = window.constraints = {
    audio: true,
    video: false
  };

  $window.navigator.getUserMedia = $window.navigator.getUserMedia ||
    $window.navigator.webkitGetUserMedia || $window.navigator.mozGetUserMedia;

  function successCallback(stream) {
    // Put variables in global scope to make them available to the browser console.
    window.stream = stream;
    SoundMeter.connectToSource(stream);

    $interval(function() {
      updateData(SoundMeter);
    }, 200);
  }

  function errorCallback(error) {
    console.log('$window.navigator.getUserMedia error: ', error);
  }

  $window.navigator.getUserMedia(constraints, successCallback, errorCallback);
}]);
