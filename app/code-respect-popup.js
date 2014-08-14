chrome.runtime.sendMessage({ popupMessage: "injectContentScripts" });

var code  = document.getElementsByTagName('code');

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  if (request.openCode) {
    code.innerHTML = JSON.parse(request.openCode);
  }
});

hljs.initHighlightingOnLoad();
