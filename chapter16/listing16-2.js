var app = angular.module('app', []);
app.controller('main', ['$scope', function($scope) {
  $scope.firstName = $scope.lastName = undefined;
  $scope.gender = 'female';
  $scope.style = {color:'orange'};

  $scope.signup = function () {
    var person = {
      first: $scope.firstName,
      last: $scope.lastName,
      gender: $scope.gender
    }
    console.log(person);
  };
}]);
