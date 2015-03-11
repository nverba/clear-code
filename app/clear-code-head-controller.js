ClearCodeApp.controller('ClearCodeHeadController', ['$scope', 'options', function ClearCodeHeadController($scope, options) {

  $scope.css = {};

  options.ready.then(function () {

    $scope.$watch( function (){ return options.categories.theme_options; }, function (newValue, oldValue) {
      $scope.css.highlighter = chrome.extension.getURL( 'prettyprint/' + options.categories.theme_options.css_theme + '.css' );
    });
  });
}]);
