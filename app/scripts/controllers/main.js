'use strict';

/**
 * @ngdoc function
 * @name shhhhApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shhhhApp
 */
angular.module('shhhhApp')
  .controller('MainCtrl', function ($scope, $interval) {

  $scope.labels = ["Third", "Second", "First"];
  $scope.series = ['Series A'];
  $scope.data = [
    [0, 0, 0]
  ];
  $scope.showTopThreeAlert = false;

  var isOver = false;
  var sum = 0;


  function updateData(data) {
    $scope.slowMeter = soundMeter.slow;

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
    }

    $scope.slowMeter = 0;
    $scope.limit = $scope.options[0];

    $scope.getTotal = function() {
      return 100;
    }

    $scope.getData = function() {
      return $scope.slowMeter * 100;
    }

    // Meter class that generates a number correlated to audio volume.
    // The meter class itself displays nothing, but it makes the
    // instantaneous and time-decaying volumes available for inspection.
    // It also reports on the fraction of samples that were at or near
    // the top of the measurement range.
    function SoundMeter(context) {
      this.context = context;
      this.instant = 0.0;
      this.slow = 0.0;
      this.clip = 0.0;
      this.script = context.createScriptProcessor(2048, 1, 1);
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
    }

    SoundMeter.prototype.connectToSource = function(stream) {
      console.log('SoundMeter connecting');
      this.mic = this.context.createMediaStreamSource(stream);
      this.mic.connect(this.script);
      // necessary to make sample run, but should not be.
      this.script.connect(this.context.destination);
    };

    SoundMeter.prototype.stop = function() {
      this.mic.disconnect();
      this.script.disconnect();
    };

    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      window.audioContext = new AudioContext();
    } catch (e) {
      alert('Web Audio API not supported.');
    }

    // Put variables in global scope to make them available to the browser console.
    var constraints = window.constraints = {
      audio: true,
      video: false
    };

    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    function successCallback(stream) {
      // Put variables in global scope to make them available to the browser console.
      window.stream = stream;
      var soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
      soundMeter.connectToSource(stream);

      $interval(function() {
        updateData(soundMeter.slow);
      }, 200);
    }

    function errorCallback(error) {
      console.log('navigator.getUserMedia error: ', error);
    }

    navigator.getUserMedia(constraints, successCallback, errorCallback);
  });
