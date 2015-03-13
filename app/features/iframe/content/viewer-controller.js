(function () { 'use strict';

  angular.module('ClearCodeApp').controller('ViewerController', ['$scope', 'options', ViewerControllerFn]);

  function ViewerControllerFn($scope, options) {

    this.closeFrame = function () {
      chrome.runtime.sendMessage({ tabMessage: { frameDisplay: 'none' }});
    };

    var container = document.getElementById('clear-code-container');

    options.ready.then(function () {

      this.margins     = options.categories.theme_options.margin_size;
      this.menu_margin = this.margins < 40 ? 0 : this.margins - 40;

      $scope.$watch( function (){ return options.categories.theme_options; }, function (newValue, oldValue) {

        if (angular.equals(newValue, oldValue)) { return; }

        this.margins     = options.categories.theme_options.margin_size;
        this.menu_margin = this.margins < 40 ? 0 : this.margins - 40;

        this.formatCode();
      }.bind(this));
    }.bind(this));
  }

})();
