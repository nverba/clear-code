OptionsApp.controller('HeadController', function HeadController($scope, $timeout, Options) {

  function cssForcePaint() {
    // refresh each pre block to force css re-paint on mouse-up - hack, otherwise odd repaint delay untill next mouse move;
    angular.forEach(document.getElementsByTagName('pre'), function (tag) {
      $timeout(function function_name () {
        tag.style.display = 'block';
      }, 50);
    });
  }

  Options.then(function (options) {
    $scope.$watch( function (){ return options.section.css_href.style; }, function (newValue, oldValue) {
      $scope.css_href = chrome.extension.getURL( 'highlight/styles/' + options.section.css_href.style );
      cssForcePaint();
    });
  });
});
