var code_block = document.getElementById('clear-code-code');
var hide  = document.getElementById('clear-code-frame-hide');
var hlcss = document.getElementById('highlight-css-link');

var js    = document.getElementById('beautify_js');
var html  = document.getElementById('beautify_html');
var css   = document.getElementById('beautify_css');
var reset = document.getElementById('beautify_reset');

var options = {};

var code  = "";

function highlight() {
  code_block.className = "";
  hljs.highlightBlock(code_block);
}

function format(beautifier, name) {
  code_block.innerHTML = code;
  if (beautifier) {
    console.log(options[name]);
    code_block.innerText = beautifier(code_block.innerText, options[name]);
  }
  highlight();
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.openCode) {
    code = JSON.parse(request.openCode);
    format();
  }
});

chrome.storage.local.get({ 'css_href': 'default.css' }, function (response) {
  hlcss.href = 'highlight/styles/' + response.css_href.style;
});

chrome.storage.onChanged.addListener(function (changes, namespace) {

  if (changes.highlight_css_link) {
    hlcss.href = 'highlight/styles/' + changes.highlight_css_link.newValue;
    highlight();
  }
  if (changes.js_beautifier) {
    options.js = changes.js_beautifier.newValue;
  }
  if (changes.html_beautifier) {
    options.html = changes.html_beautifier.newValue;
  }
  if (changes.css_beautifier) {
    options.css = changes.css_beautifier.newValue;
  }
});

hide.onclick = function (event) {
  chrome.runtime.sendMessage({ tabMessage: { frame: { display: 'none' }}});
};

js.onclick = function () {
  format(js_beautify, "js");
};

html.onclick = function () {
  format(html_beautify, "html");
};

css.onclick = function () {
  format(css_beautify, "css");
};

reset.onclick = function () {
  format();
};
