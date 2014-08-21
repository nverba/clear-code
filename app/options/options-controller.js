OptionsApp.controller('OptionsController', function OptionsController($scope, Options) {

  $scope.menu    = ['Highlighter', 'JS Beautifier', 'HTML Beautifier', 'CSS Beautifier'];
  $scope.page_id = $scope.menu[0];

  $scope.showPage = function (id) {
    $scope.page_id  = id;
  };
});
