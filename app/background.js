chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  if (request.openCode) {
    console.log("This is forwarding");
    chrome.tabs.sendMessage(sender.tab.id, request);
  }

  if (request.injectCodeRespect) {

    chrome.tabs.insertCSS({
      file: 'code-respect-buttons.css'
    });
    chrome.tabs.executeScript({
      file: 'code-respect.js'
    });

    sendResponse({ response: "success" });
  }
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript({
    file: 'code-respect-injector.js'
  });
});
