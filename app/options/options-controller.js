OptionsApp.controller('OptionsController', function OptionsController($scope, default_options, Options) {

  $scope.menu    = ['Highlighter', 'JS Beautifier', 'HTML Beautifier', 'CSS Beautifier'];
  $scope.page_id = $scope.menu[0];

  $scope.showPage = function (id) {
    $scope.page_id  = id;
  };

  $scope.default_options = default_options;
  Options.then(function (options) {
    $scope.options = options;
  });
});
