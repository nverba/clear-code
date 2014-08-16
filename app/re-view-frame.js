var code_block = document.getElementById('re-view-code');
var hide  = document.getElementById('re-view-frame-hide');
var hlcss = document.getElementById('highlight-css-link');

var js    = document.getElementById('beautify_js');
var html  = document.getElementById('beautify_html');
var css   = document.getElementById('beautify_css');
var reset = document.getElementById('beautify_reset');

var code  = "";

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.openCode) {
    code = JSON.parse(request.openCode);
    code_block.innerHTML = code;
    code_block.className = "";
    hljs.highlightBlock(code_block);
  }
});

chrome.storage.local.get({ 'highlight_css_link': 'default' }, function (response) {
  hlcss.href = 'highlight/styles/' + response.highlight_css_link + '.css';
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (!changes.highlight_css_link) { return; }
  hlcss.href = 'highlight/styles/' + changes.highlight_css_link.newValue + '.css';
  code_block.className = "";
  hljs.highlightBlock(code_block);
});

hide.onclick = function (event) {
  chrome.runtime.sendMessage({ tabMessage: { frame: { display: 'none' }}});
};

js.onclick = function () {
  code_block.innerText = js_beautify(code);
};
