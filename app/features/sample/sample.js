// sample.html & sample.js are resources for the options page, see chrome-options.json

(function () { 'use strict';

  var css_link = document.getElementById('css_theme');
  var code     = document.getElementById('clear-code-code');
  var pre      = document.getElementById('clear-code-pre');
  var sample   = pre.innerHTML;

  // force css repaint after href updated, needed for browsing theme drop down with arrow keys.
  function goPrint() {
    setTimeout(function () {
      css_link.style.display = 'block';
      prettyPrint();
    }, 50);
  }

  function updateCss(response) {

    css_link.href             = '../../prettyprint/' + response.theme_options.css_theme + '.css';
    code.style['font-family'] = response.theme_options.font_family;
    code.style['font-size']   = response.theme_options.font_size + 'px';
    code.style['line-height'] = response.theme_options.line_height + 'em';
    pre.className             = response.theme_options.line_nums ? "prettyprint linenums" : "prettyprint";

    goPrint();
  }

  chrome.storage.local.get({ 'clearCodeOptions': { theme_options: { css_theme: 'default.css' }}}, function (response) {

    updateCss(response.clearCodeOptions);
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace !== 'local' || !changes.clearCodeOptions ) { return; }

    pre.innerHTML = sample;
    code = document.getElementById('clear-code-code');

    updateCss(changes.clearCodeOptions.newValue);
  });

  goPrint();
})();
