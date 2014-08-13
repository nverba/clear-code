chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  if (request.popupMessage == "injectContentScripts") {
    chrome.tabs.executeScript({
      file: 'code-respect-inject.js'
    });

    sendResponse({ response: "success" });
  }

  if (request.codeRespectRequest == "codeRespectInject") {

    chrome.tabs.executeScript({
      file: 'highlight/highlight.pack.js'
    });

    chrome.tabs.insertCSS({
      file: 'code-respect.css'
    });
    chrome.tabs.executeScript({
      file: 'code-respect.js'
    });

    chrome.tabs.insertCSS({
      file: 'highlight/styles/railscasts.css'
    });

    sendResponse({ response: "success" });
  }
});
