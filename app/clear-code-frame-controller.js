ClearCodeApp.controller('ClearCodeFrameController', function ClearCodeFrameController($scope, options) {

  $scope.closeFrame = function () {
    chrome.runtime.sendMessage({ tabMessage: { frameDisplay: 'none' }});
  };

});
