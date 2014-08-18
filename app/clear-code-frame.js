var code_block = document.getElementById('clear-code-code');
var hide  = document.getElementById('clear-code-frame-hide');
var hlcss = document.getElementById('highlight-css-link');

var js    = document.getElementById('beautify_js');
var html  = document.getElementById('beautify_html');
var css   = document.getElementById('beautify_css');
var reset = document.getElementById('beautify_reset');

var js_beautifier;

var js_beautifier_defaults = {

  "indent_size": 4,
  "indent_char": " ",
  "indent_level": 0,
  "indent_with_tabs": false,
  "preserve_newlines": true,
  "max_preserve_newlines": 10,
  "jslint_happy": false,
  "brace_style": "collapse",
  "keep_array_indentation": false,
  "keep_function_indentation": false,
  "space_before_conditional": true,
  "break_chained_methods": false,
  "eval_code": false,
  "unescape_strings": false,
  "wrap_line_length": 0

};

chrome.storage.local.get({ 'js_beautifier': js_beautifier_defaults }, function (response) {
  js_beautifier = response.js_beautifier;
});

var code  = "";

function highlight() {
  code_block.className = "";
  hljs.highlightBlock(code_block);
}

function format(beautifier) {
  code_block.innerHTML = code;
  if (beautifier) {
    code_block.innerText = beautifier(code_block.innerText, js_beautifier);
  }
  highlight();
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.openCode) {
    code = JSON.parse(request.openCode);
    format();
  }
});

chrome.storage.local.get({ 'highlight_css_link': 'default' }, function (response) {
  hlcss.href = 'highlight/styles/' + response.highlight_css_link;
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.highlight_css_link) {
    hlcss.href = 'highlight/styles/' + changes.highlight_css_link.newValue;
    highlight();
  }
  if (changes.js_beautifier) {
    js_beautifier = changes.js_beautifier.newValue;
  }
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
