ClearCodeApp.directive('formatCode', function (options, $timeout) {
  'use strict';

  return {

    restrict: 'A',
    link: function (scope, elem, attrs) {

      var element = elem[0],
          pre     = document.getElementById('clear-code-pre'),
          code    = document.getElementById('clear-code-code'),
          content = '',
          saved_state = pre.innerHTML;

      function highlight_code() {

        pre.className = scope.active_beau ? 'prettyprint lang-' + scope.active_beau : "prettyprint";
        pre.className += options.categories.theme_options.line_nums ? ' linenums ' : '';
        prettyPrint();
      }

      scope.formatCode = function format_code(name) {
        options.ready.then(function () {

          pre.innerHTML  = saved_state;
          code = document.getElementById('clear-code-code');
          code.style['font-family'] = options.categories.theme_options.font_family;
          code.style['font-size'] = options.categories.theme_options.font_size;
          code.innerHTML = name ? window[name + '_beautify'](content, options.categories[name + '_options']) : content;
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
