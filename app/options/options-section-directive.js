OptionsApp.directive('optionsSection', function () {
  'use strict';

  return {

    restrict: 'E',
    scope: { defaults: "=", model: "=" },
    templateUrl: "options-section-directive.html",
    link: function (scope, elem, attrs) {

      scope.resetCat = function () {
        angular.forEach(scope.defaults, function (value, key) {
          scope.model[key] = value.default;
        });
      };
    }
  };
});
