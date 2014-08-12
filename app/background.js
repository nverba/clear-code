chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.tabs.executeScript({
    file: 'inject-request.js'
  });
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  if (request.codeRespectRequest == "codeRespectInject") {

    chrome.tabs.insertCSS({
      file: 'code-respect.css'
    });
    chrome.tabs.executeScript({
      file: 'code-respect.js'
    });
    chrome.tabs.executeScript({
      file: 'scripts/libs.js'
    });

    sendResponse({ response: "success" });
  }
});


