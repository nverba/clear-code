ClearCodeApp.controller('ClearCodeHeadController', function ClearCodeHeadController($scope, options) {

  options.ready.then(function () {

    $scope.$watch( function (){ return options.categories.css_href.style; }, function (newValue, oldValue) {
      $scope.css_href = chrome.extension.getURL( 'highlight/styles/' + options.categories.css_href.style );
    });
  });
});
