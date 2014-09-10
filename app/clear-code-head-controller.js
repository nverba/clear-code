ClearCodeApp.controller('ClearCodeHeadController', function ClearCodeHeadController($scope, options) {

  $scope.css = {};

  options.ready.then(function () {

    $scope.$watch( function (){ return options.categories.theme_options; }, function (newValue, oldValue) {
      $scope.css.highlighter = chrome.extension.getURL( 'highlight/styles/' + options.categories.theme_options.css_theme + '.css' );
    });
  });
});
