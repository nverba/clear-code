
var iframe = document.createElement('iframe');
    iframe.id = 'clear-code-frame';
    iframe.src = chrome.runtime.getURL("features/iframe/content/index.html");
    iframe.scrolling = "no";
    iframe.style.display = 'none';

document.body.appendChild(iframe);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.frameDisplay) {

    iframe.style.display = request.frameDisplay;
    sendResponse({ response: "success" });
  }

  if (request.openSelection) {
    chrome.runtime.sendMessage({ tabMessage: { openCode: JSON.stringify(window.getSelection().toString()) }});
    iframe.style.display = 'block';
  }
});
