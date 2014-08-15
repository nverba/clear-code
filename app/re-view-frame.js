var code  = document.getElementById('re-view-code');
var hide  = document.getElementById('re-view-frame-hide');
var hlcss = document.getElementById('highlight-css-link');

hide.onclick = function (event) {
  chrome.runtime.sendMessage({ tabMessage: { frame: { display: 'none' }}});
};

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.openCode) {
    code.innerHTML = JSON.parse(request.openCode);
    code.className = "";
    hljs.highlightBlock(code);
  }
});

chrome.storage.local.get({ 'highlight_css_link': 'tomorrow-night' }, function (response) {
  hlcss.href = 'highlight/styles/' + response.highlight_css_link + '.css';
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (!changes.highlight_css_link) { return; }
  hlcss.href = 'highlight/styles/' + changes.highlight_css_link.newValue + '.css';
  hljs.highlightBlock(code);
});
