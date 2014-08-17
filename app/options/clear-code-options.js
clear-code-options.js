var Options = angular.module('Options', []);


Options.controller('OptionsController', function MoCaCtrl($scope) {
  $scope.menu = ['Highlighter', 'Beautifier'];
  $scope.name = { active: $scope.menu[0] };

  $scope.makeActive = function (item) {
    $scope.name.active = item;
  };
});


var css   = document.getElementById('highlight-css-link');
var code  = document.getElementById('code');
var style = document.getElementById('hljs-style');


