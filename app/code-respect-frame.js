var code  = document.getElementById('code-respect-code');
var hide  = document.getElementById('code-respect-frame-hide');

hide.onclick = function (event) {
  chrome.runtime.sendMessage({ tabMessage: { frame: { display: 'none' }}});
};

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.openCode) {
    code.innerHTML = JSON.parse(request.openCode);
    hljs.highlightBlock(code);
  }
});
