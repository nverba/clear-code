chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  // Re-sends messages accross entire tab, reaching in/out of frames
  if (request.tabMessage) {
    chrome.tabs.sendMessage(sender.tab.id, request.tabMessage);
  }

  if (request.injectClearCode) {

    chrome.tabs.insertCSS({
      file: 'clear-code-content.css'
    });
    chrome.tabs.executeScript({
      file: 'clear-code-content.js'
    });

    sendResponse({ response: "success" });
  }
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript({
    file: 'clear-code-injector.js'
  });
});
