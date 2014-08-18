Options.controller('HeadController', function HeadController($scope, $timeout) {

  function refresh() {
    // refresh each pre block to force css re-paint on mouse-up;
    angular.forEach(document.getElementsByTagName('pre'), function (tag) {
      $timeout(function function_name () {
        tag.style.display = 'block';
      }, 10);
    });
  }

  chrome.storage.local.get({ 'highlight_css_link': 'default' }, function (response) {
    $scope.$apply(function () {
      $scope.highlighterStyle = { url: chrome.extension.getURL('highlight/styles/' + response.highlight_css_link)};
    });
  });

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (!changes.highlight_css_link) { return; }

    $scope.$apply(function () {
      $scope.highlighterStyle.url = chrome.extension.getURL('highlight/styles/' + changes.highlight_css_link.newValue);
      refresh();
    });
  });
});
