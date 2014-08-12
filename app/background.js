chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.insertCSS({
    file: 'code-respect.css'
  });
  chrome.tabs.executeScript({
    file: 'code-respect.js'
  });
  chrome.tabs.executeScript({
    file: 'scripts/libs.js'
  });
});
