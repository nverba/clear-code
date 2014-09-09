ClearCodeApp.controller('ClearCodeFrameController', function ClearCodeFrameController($scope, options) {

  $scope.closeFrame = function () {
    chrome.runtime.sendMessage({ tabMessage: { frameDisplay: 'none' }});
  };

  var container = document.getElementById('clear-code-container');

  options.ready.then(function () {
    $scope.margins     = options.categories.highlighter_options.margin_size;
    $scope.menu_margin = $scope.margins < 40 ? 0 : $scope.margins - 40;

    console.log($scope.menu_margin);
  });



});
