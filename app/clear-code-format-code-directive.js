ClearCodeApp.directive('formatCode', function (Options) {
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
        element.innerHTML = code;
        if (name) {
          Options.then(function (options) {
            element.innerText = window[name + '_beautify'](element.innerText, options[name]);
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

    }
  };
});
