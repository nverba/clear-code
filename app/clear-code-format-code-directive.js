ClearCodeApp.directive('formatCode', function (Options, $timeout) {
  'use strict';

  return {

    restrict: 'A',
    link: function (scope, elem, attrs) {

      var element = elem[0],
          code    = "";

      scope.highlightCode = function highlight_code() {

        element.className = "";
        hljs.highlightBlock(element);
      };

      scope.formatCode = function format_code(name) {

        element.innerText = code;
        if (name) {
          Options.ready.then(function () {
            element.innerText = window[name + '_beautify'](element.innerText, Options.categories[name]);
            scope.highlightCode();
          });
        } else {
          scope.highlightCode();
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
