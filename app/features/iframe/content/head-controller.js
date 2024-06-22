(function () { 'use strict';

  angular.module('ClearCodeApp').controller('HeadController', ['$scope', 'options', ClearCodeHeadControllerFn]);

  function ClearCodeHeadControllerFn($scope, options) {

    this.css = {};
    options.ready.then(function () {

      $scope.$watch( function (){ return options.categories.theme_options; }, angular.bind(this, function () {
        this.css.highlighter = chrome.runtime.getURL( '../../prettyprint/' + options.categories.theme_options.css_theme + '.css' );
      } ));

    }.bind(this));
  }

})();
