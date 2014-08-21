ClearCodeApp.controller('ClearCodeHeadController', function ClearCodeHeadController($scope, Options) {

  Options.then(function (options) {
    $scope.$watch( function (){ return options.section.css_href.style; }, function (newValue, oldValue) {
      $scope.css_href = chrome.extension.getURL( 'highlight/styles/' + options.section.css_href.style );
    });
  });
});
