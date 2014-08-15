var code  = document.getElementById('re-view-code');
var hide  = document.getElementById('re-view-frame-hide');

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
