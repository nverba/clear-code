ClearCodeApp.controller('ClearCodeHeadController', function ClearCodeHeadController($scope, Options) {

  Options.ready.then(function () {

    $scope.$watch( function (){ return Options.categories.css_href.style; }, function (newValue, oldValue) {
      $scope.css_href = chrome.extension.getURL( 'highlight/styles/' + Options.categories.css_href.style );
    });
  });
});
