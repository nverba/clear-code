hljs.initHighlightingOnLoad();

var css_link = document.getElementById('css_theme');

chrome.storage.local.get({ 'clearCodeOptions': { highlighter_options: { css_theme: 'default.css' }}}, function (response) {
  css_link.href = 'highlight/styles/' + response.clearCodeOptions.highlighter_options.css_theme;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace !== 'local' || !changes.clearCodeOptions ) { return; }

  css_link.href = 'highlight/styles/' + changes.clearCodeOptions.newValue.highlighter_options.css_theme;
  css_link.display = 'block';
});
