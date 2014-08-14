chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  // Re-sends messages accross entire tab, reaching in/out of frames
  if (request.tabMessage) {
    chrome.tabs.sendMessage(sender.tab.id, request.tabMessage);
  }

  if (request.injectCodeRespect) {

    chrome.tabs.insertCSS({
      file: 'code-respect-content.css'
    });
    chrome.tabs.executeScript({
      file: 'code-respect-content.js'
    });

    sendResponse({ response: "success" });
  }
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript({
    file: 'code-respect-injector.js'
  });
});
