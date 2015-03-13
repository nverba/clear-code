(function () { 'use strict';

  angular.module('ClearCodeApp').directive('formatCode', ['options', '$timeout', formatCodeFn]);

  function formatCodeFn(options, $timeout) {

    return {

      restrict: 'A',
      link: function (scope, elem, attrs) {

        var element = elem[0],
            pre     = document.getElementById('clear-code-pre'),
            code    = document.getElementById('clear-code-code'),
            content = '',
            saved_state = pre.innerHTML;

        scope.viewer.formatCode = function viewerFormatCode(name) {

          options.ready.then(function () {

            scope.viewer.active_beau = name ? name : false;

            pre.innerHTML = saved_state;
            pre.className = scope.viewer.active_beau ? 'prettyprint lang-' + scope.viewer.active_beau : "prettyprint";
            pre.className += options.categories.theme_options.line_nums ? ' linenums ' : '';

            code = document.getElementById('clear-code-code');
            code.style['font-family'] = options.categories.theme_options.font_family;
            code.style['font-size']   = options.categories.theme_options.font_size + 'px';
            code.style['line-height'] = options.categories.theme_options.line_height + 'em';
            code.textContent = name ? window[name + '_beautify'](content, options.categories[name + '_options']) : content;

            prettyPrint();

          });
        };

        chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

          if (request.openCode) {
            content = JSON.parse(request.openCode);
            scope.viewer.formatCode();
          }
        });

        $timeout(function () {
          chrome.runtime.sendMessage({ tabUnlock: true });
        });

      }
    };
  }


})();
