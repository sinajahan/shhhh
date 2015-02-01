'use strict';

/**
 * @ngdoc function
 * @name shhhhApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shhhhApp
 */
angular.module('shhhhApp')
  .controller('MainCtrl', ['$window', '$scope', '$interval', 'SoundMeter',
                  function ($window, $scope, $interval, SoundMeter) {

  var isOver = false;
  var sum = 0;

  $scope.labels = ['Third', 'Second', 'First'];
  $scope.series = ['Series A'];
  $scope.data = [[0, 0, 0]];

  $scope.showTopThreeAlert = false;

  function updateData(data) {
    $scope.slowMeter = data;

    if (isOver) {
      sum += $scope.slowMeter;
    }

    if ($scope.isNoiseOverLimit() && !isOver) {
      isOver = true;
    }

    if (!$scope.isNoiseOverLimit() && isOver) {
      isOver = false;
      if (sum > $scope.data[0][0]) {
        $scope.data[0].shift();
        $scope.data[0].push(sum);
        $scope.data[0].sort();

        $scope.showTopThreeAlert = true;
        window.setTimeout(function() {
          $scope.showTopThreeAlert = false;
        }, 2000);
      }
      sum = 0;
    }
  }

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

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

    $scope.isNoiseOverLimit = function() {
      return $scope.getData() >= $scope.limit.value;
    };

    $scope.slowMeter = 0;
    $scope.limit = $scope.options[0];

    $scope.getTotal = function() {
      return 100;
    };

    $scope.getData = function() {
      return $scope.slowMeter * 100;
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
        updateData(SoundMeter.slow);
      }, 200);
    }

    function errorCallback(error) {
      console.log('$window.navigator.getUserMedia error: ', error);
    }

    $window.navigator.getUserMedia(constraints, successCallback, errorCallback);
  }]);
