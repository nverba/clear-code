(function () { 'use strict';

  angular.module('ClearCodeApp').controller('ViewerController', ['$scope', 'options', ViewerControllerFn]);

  function ViewerControllerFn($scope, options) {

    this.closeFrame = function () {
      chrome.runtime.sendMessage({ tabMessage: { frameDisplay: 'none' }});
    };

    var container = document.getElementById('clear-code-container');

    options.ready.then(function () {

      function setMargins(context) {
        context.margins     = options.categories.theme_options.margin_size;
        context.menu_margin = context.margins < 40 ? 0 : context.margins - 40;
      }

      setMargins(this);

      $scope.$watch( function (){ return options.categories.theme_options; }, function (newValue, oldValue) {

        if (angular.equals(newValue, oldValue)) { return; }

        setMargins(this);

        this.formatCode();
      }.bind(this));
    }.bind(this));
  }

})();
