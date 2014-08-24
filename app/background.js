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

chrome.contextMenus.create({ title: "Open selection with Clear-Code", contexts: ["all"], onclick: openCode });

function openCode(context, tab) {

 // console.log('Called Selection');
 // console.log(context.selectionText.replace(/(?:\r\n|\r|\n)/g, '<br />'));

  chrome.tabs.sendMessage(tab.id, { openSelection: true });
  //chrome.tabs.sendMessage(tab.id, { openCode: JSON.stringify(code.innerHTML) });
  //chrome.tabs.sendMessage(tab.id, { frame: { display: 'block' }});
}
