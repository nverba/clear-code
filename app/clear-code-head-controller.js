(function () { 'use strict';

  angular.module('ClearCodeApp').controller('ClearCodeHeadController', ['$scope', 'options', ClearCodeHeadControllerFn]);

  function ClearCodeHeadControllerFn($scope, options) {

    this.css = {};
    options.ready.then(function () {

      $scope.$watch( function (){ return options.categories.theme_options; }, angular.bind(this, function () {
        this.css.highlighter = chrome.extension.getURL( 'prettyprint/' + options.categories.theme_options.css_theme + '.css' );
      } ));

    }.bind(this));
  }

})();
