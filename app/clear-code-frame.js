var code_block = document.getElementById('clear-code-code');
var hide  = document.getElementById('clear-code-frame-hide');
var hlcss = document.getElementById('highlight-css-link');

var js    = document.getElementById('beautify_js');
var html  = document.getElementById('beautify_html');
var css   = document.getElementById('beautify_css');
var reset = document.getElementById('beautify_reset');

var code  = "";

function highlight() {
  code_block.className = "";
  hljs.highlightBlock(code_block);
}

function format(beautifier) {
  code_block.innerHTML = code;
  if (beautifier) { code_block.innerText = beautifier(code_block.innerText); }
  highlight();
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.openCode) {
    code = JSON.parse(request.openCode);
    format();
  }
});

chrome.storage.local.get({ 'highlight_css_link': 'default' }, function (response) {
  hlcss.href = 'highlight/styles/' + response.highlight_css_link + '.css';
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (!changes.highlight_css_link) { return; }
  hlcss.href = 'highlight/styles/' + changes.highlight_css_link.newValue + '.css';
  highlight();
});

hide.onclick = function (event) {
  chrome.runtime.sendMessage({ tabMessage: { frame: { display: 'none' }}});
};

js.onclick = function () {
  format(js_beautify);
};

html.onclick = function () {
  format(html_beautify);
};

css.onclick = function () {
  format(css_beautify);
};

reset.onclick = function () {
  format();
};
