hljs.initHighlightingOnLoad();

var css_link = document.getElementById('css_theme');
var code     = document.getElementById('clear-code-code');

chrome.storage.local.get({ 'clearCodeOptions': { highlighter_options: { css_theme: 'default.css' }}}, function (response) {
  css_link.href = 'highlight/styles/' + response.clearCodeOptions.highlighter_options.css_theme;
  code.style['font-family'] = response.clearCodeOptions.highlighter_options.font_family;
  code.style['font-size'] = response.clearCodeOptions.highlighter_options.font_size + 'px';
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace !== 'local' || !changes.clearCodeOptions ) { return; }

  css_link.href = 'highlight/styles/' + changes.clearCodeOptions.newValue.highlighter_options.css_theme;
  code.style['font-family'] = changes.clearCodeOptions.newValue.highlighter_options.font_family;
  code.style['font-size']   = changes.clearCodeOptions.newValue.highlighter_options.font_size + 'px';

  // force css repaint after href updated, needed for browsing theme drop down with arrow keys.
  setTimeout(function () {
    css_link.style.display = 'block';
  }, 50);
});
