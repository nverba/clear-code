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

chrome.storage.local.get({ 'clearCodeOptions': { theme_options: { css_theme: 'default.css' }}}, function (response) {

  css_link.href = 'highlight/styles/' + response.clearCodeOptions.theme_options.css_theme + '.css';
  code.style['font-family'] = response.clearCodeOptions.theme_options.font_family;
  code.style['font-size'] = response.clearCodeOptions.theme_options.font_size + 'px';
  pre.className = response.clearCodeOptions.theme_options.line_nums ? "prettyprint linenums" : "prettyprint";
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace !== 'local' || !changes.clearCodeOptions ) { return; }

  pre.innerHTML = sample;
  code = document.getElementById('clear-code-code');

  css_link.href             = 'highlight/styles/' + changes.clearCodeOptions.newValue.theme_options.css_theme + '.css';
  code.style['font-family'] = changes.clearCodeOptions.newValue.theme_options.font_family;
  code.style['font-size']   = changes.clearCodeOptions.newValue.theme_options.font_size + 'px';
  pre.className             = changes.clearCodeOptions.newValue.theme_options.line_nums ? "prettyprint linenums" : "prettyprint";

  goPrint();
});

goPrint();
