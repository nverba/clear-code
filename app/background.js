chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  if (request.background == "codeRespectInject") {

    chrome.tabs.insertCSS({
      file: 'code-respect-buttons.css'
    });
    chrome.tabs.executeScript({
      file: 'code-respect.js'
    });
    sendResponse({ response: "success" });
  }

  if (request.popupMessage == "injectContentScripts") {
    chrome.tabs.executeScript({
      file: 'code-respect-injector.js'
    });

    sendResponse({ response: "success" });
  }
});
