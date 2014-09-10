ClearCodeApp.directive('formatCode', function (options, $timeout) {
  'use strict';

  return {

    restrict: 'A',
    link: function (scope, elem, attrs) {

      var element = elem[0],
          code    = "";

      scope.formatCode = function format_code(name) {

        element.innerText = code;
        if (name) {
          options.ready.then(function () {
            element.innerText = window[name + '_beautify'](element.innerText, options.categories[name + '_options']);
            prettyPrint();
            scope.active_beau = name;
          });
        } else {
          prettyPrint();
          scope.active_beau = '';
        }
      };

      chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

        if (request.openCode) {
          code = JSON.parse(request.openCode);
          scope.formatCode();
        }
      });

      $timeout(function () {
        chrome.runtime.sendMessage({ tabUnlock: true });
      });

    }
  };
});
