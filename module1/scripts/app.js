(function () {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {

    $scope.responseMessage = 'Please enter data first.';
    $scope.lunchItems = '';
    $scope.fontStyle = {color: 'red'};
    $scope.borderColor = {'border-color': 'red'};

    $scope.checkTooMuch = function () {
      var list = $scope.lunchItems.split(', ');
      list = list.filter(String);

      if (list.length == 0) {
        $scope.responseMessage = 'Please enter data first.';
        $scope.fontStyle = {color: 'red'};
        $scope.borderColor = {'border-color': 'red'};
      }
      else if (list.length <= 3) {
        $scope.responseMessage = 'Enjoy!';
        $scope.fontStyle = {color: 'green'};
        $scope.borderColor = {'border-color': 'green'};
      }
      else {
        $scope.responseMessage = 'Too much!';
        $scope.fontStyle = {color: 'green'};
        $scope.borderColor = {'border-color': 'green'};
      }
    };
  }
})();
