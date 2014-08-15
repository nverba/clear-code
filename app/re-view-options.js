var css   = document.getElementById('highlight-css-link');
var code  = document.getElementById('code');
var style = document.getElementById('hljs-style');

chrome.storage.local.get({ 'highlight_css_link': 'default' }, function (response) {
  style.value = response.highlight_css_link;
});

style.onchange = function (new_style) {
  chrome.storage.local.set({ 'highlight_css_link': style.value });
};

chrome.storage.local.get({ 'highlight_css_link': 'default' }, function (response) {
  css.href = 'highlight/styles/' + response.highlight_css_link + '.css';
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (!changes.highlight_css_link) { return; }
  code.className = "";
  css.href = 'highlight/styles/' + changes.highlight_css_link.newValue + '.css';
  hljs.highlightBlock(code);
});

hljs.highlightBlock(code);
