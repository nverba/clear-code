OptionsApp.controller('OptionsController', function OptionsController($scope, default_options, Options) {

  $scope.menu    = ['Highlighter', 'JS Beautifier', 'HTML Beautifier', 'CSS Beautifier'];
  $scope.page_id = $scope.menu[0];

  $scope.showPage = function (id) {
    $scope.page_id  = id;
  };

  $scope.default_options = default_options;

  Options.then(function (options) {

    angular.forEach(options.section, function (value, key) {
      $scope.$watchCollection( function (){ return options.section[key]; }, function (newValue, oldValue) {
        options.updateOptions[key]();
      });
    });
    $scope.options = options.section;
  });
});
