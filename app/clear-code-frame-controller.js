(function () { 'use strict';

  angular.module('ClearCodeApp').controller('ClearCodeFrameController', ['$scope', 'options', ClearCodeFrameControllerFn]);

  function ClearCodeFrameControllerFn($scope, options) {

    $scope.closeFrame = function () {
      chrome.runtime.sendMessage({ tabMessage: { frameDisplay: 'none' }});
    };

    var container = document.getElementById('clear-code-container');

    options.ready.then(function () {
      $scope.margins     = options.categories.theme_options.margin_size;
      $scope.menu_margin = $scope.margins < 40 ? 0 : $scope.margins - 40;

      $scope.$watch( function (){ return options.categories.theme_options; }, function (newValue, oldValue) {
        if (angular.equals(newValue, oldValue)) { return; }

        $scope.margins     = options.categories.theme_options.margin_size;
        $scope.menu_margin = $scope.margins < 40 ? 0 : $scope.margins - 40;

        $scope.formatCode();
      });
    });
  }

})();
