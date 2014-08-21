var code_block = document.getElementById('clear-code-code');
var hide  = document.getElementById('clear-code-frame-hide');

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

chrome.storage.onChanged.addListener(function (changes, namespace) {

  if (changes.css_href) {
    hlcss.href = 'highlight/styles/' + changes.css_href.newValue.style;
    highlight();
  }
  if (changes.js) {
    options.js = changes.js.newValue;
  }
  if (changes.html) {
    options.html = changes.html.newValue;
  }
  if (changes.css) {
    options.css = changes.css.newValue;
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
