ClearCodeApp.directive('formatCode', function (options, $timeout) {
  'use strict';

  return {

    restrict: 'A',
    link: function (scope, elem, attrs) {

      var element = elem[0],
          code    = "",
          pre     = document.getElementById('clear-code-pre');

      function highlight_code() {

        pre.className = scope.active_beau ? 'prettyprint lang-' + scope.active_beau : "prettyprint";
        prettyPrint();
      }

      scope.formatCode = function format_code(name) {

        element.innerText = code;
        if (name) {
          options.ready.then(function () {
            element.innerText = window[name + '_beautify'](element.innerText, options.categories[name + '_options']);
            scope.active_beau = name;
            highlight_code();
          });
        } else {
          scope.active_beau = '';
          highlight_code();
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
