ClearCodeApp.directive('formatCode', function (options, $timeout) {
  'use strict';

  return {

    restrict: 'A',
    link: function (scope, elem, attrs) {

      var element = elem[0],
          pre     = document.getElementById('clear-code-pre'),
          content = '',
          saved_state = pre.innerHTML,
          code;

      function highlight_code() {

        pre.className = scope.active_beau ? 'prettyprint lang-' + scope.active_beau : "prettyprint";
        pre.className += options.categories.theme_options.line_nums ? ' linenums ' : '';
        prettyPrint();
      }

      scope.formatCode = function format_code(name) {
        options.ready.then(function () {

          pre.innerHTML  = saved_state;
          code = document.getElementById('clear-code-code');
          code.innerText = content;
          scope.active_beau = name ? name : false;

          highlight_code();

        });
      };

      chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

        if (request.openCode) {
          content = JSON.parse(request.openCode);
          scope.formatCode();
        }
      });

      $timeout(function () {
        chrome.runtime.sendMessage({ tabUnlock: true });
      });

    }
  };
});
