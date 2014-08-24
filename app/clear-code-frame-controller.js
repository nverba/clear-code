ClearCodeApp.controller('ClearCodeFrameController', function ClearCodeFrameController($scope, Options) {

  $scope.closeFrame = function () {
    chrome.runtime.sendMessage({ tabMessage: { frameDisplay: 'none' }});
  };

});
