var tabs = {};

function injectButtons() {

  chrome.tabs.executeScript({
    file: 'inject-buttons.js'
  });
  chrome.tabs.executeScript({
    file: 'inject-frame.js'
  });
}

function openSelection(context, tab) {

  chrome.tabs.executeScript({
    file: 'inject-frame.js'
  }, function () {
    if (tabs[tab.id] === 'unlocked') {
      chrome.tabs.sendMessage(tab.id, { openSelection: true });
    } else {
      tabs[tab.id] = 'pending';
    }
  });
}

function handleMessage(request, sender, sendResponse) {

  // Re-sends messages accross entire tab, reaching in/out of frames
  if (request.tabMessage) {
    chrome.tabs.sendMessage(sender.tab.id, request.tabMessage);
  }

  if (request.tabLock) {
    if (tabs[sender.tab.id] !== 'pending') {
      tabs[sender.tab.id] = 'locked';
    }
  }

  if (request.tabUnlock) {
    if (tabs[sender.tab.id] === 'pending') {
      chrome.tabs.sendMessage(sender.tab.id, { openSelection: true });
    }
    tabs[sender.tab.id] = 'unlocked';
  }

  if (request.injectClearCodeFrame) {

    chrome.tabs.insertCSS({
      file: 'clear-code.css'
    });
    chrome.tabs.executeScript({
      file: 'clear-code-injected-frame.js'
    });
    sendResponse({ response: "success" });
  }

  if (request.injectClearCodeButtons) {

    chrome.tabs.executeScript({
      file: 'clear-code-injected-buttons.js'
    });
    sendResponse({ response: "success" });
  }
}

chrome.runtime.onMessage.addListener(handleMessage);
chrome.browserAction.onClicked.addListener(injectButtons);
chrome.contextMenus.create({ title: "Open selection with Clear-Code", contexts: ["all"], onclick: openSelection });
