Options.directive('optionsSection', function () {
  'use strict';

  return {

    restrict: 'E',
    scope: { options: "=", model: "=" },
    templateUrl: "options-section-directive.html",
    link: function (scope, elem, attrs) {

      scope.reset = function () {
        angular.forEach(scope.options, function (value, key) {
          scope.model[key] = value.default;
        });
      };
    }
  };
});
