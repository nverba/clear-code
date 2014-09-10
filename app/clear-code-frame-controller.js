ClearCodeApp.controller('ClearCodeFrameController', function ClearCodeFrameController($scope, options) {

  $scope.closeFrame = function () {
    chrome.runtime.sendMessage({ tabMessage: { frameDisplay: 'none' }});
  };

  var container = document.getElementById('clear-code-container');

  options.ready.then(function () {
    $scope.margins     = options.categories.theme_options.margin_size;
    $scope.menu_margin = $scope.margins < 40 ? 0 : $scope.margins - 40;
    $scope.codeStyle   = { 'font-family': options.categories.theme_options.font_family, 'font-size': options.categories.theme_options.font_size + 'px' };

    $scope.$watch( function (){ return options.categories.theme_options; }, function (newValue, oldValue) {
      $scope.margins     = options.categories.theme_options.margin_size;
      $scope.menu_margin = $scope.margins < 40 ? 0 : $scope.margins - 40;
      $scope.codeStyle   = { 'font-family': options.categories.theme_options.font_family, 'font-size': options.categories.theme_options.font_size + 'px' };
    });
  });
});
