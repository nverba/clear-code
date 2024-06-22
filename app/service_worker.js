var tabs = {};

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function injectClearCodeFrame() {
  const tab = await getCurrentTab();

  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: () => {
          return !!window.__clearCodeFrameInjected;
        },
      },
      (results) => {
        if (results && !results[0].result) {
          chrome.runtime.sendMessage({ tabLock: true });

          chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ["features/iframe/iframe.css"],
          });

          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["features/iframe/iframe.js"],
          });

          chrome.scripting.executeScript(
            {
              target: { tabId: tab.id },
              func: () => {
                window.__clearCodeFrameInjected = true;
              },
            },
            () => resolve(true)
          );
        } else {
          resolve(true);
        }
      }
    );
  });
}

async function injectClearCodeButtons() {
  const tab = await getCurrentTab();

  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: () => {
          return !!window.__clearCodeButtonsInjected;
        },
      },
      (results) => {
        if (results && !results[0].result) {
          chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ["features/buttons/buttons.css"],
          });

          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["features/buttons/buttons.js"],
          });

          chrome.scripting.executeScript(
            {
              target: { tabId: tab.id },
              func: () => {
                window.__clearCodeButtonsInjected = true;
              },
            },
            () => resolve(true)
          );
        } else {
          resolve(true);
        }
      }
    );
  });
}

async function openSelection(context, tab) {
  await injectClearCodeFrame();
  if (tabs[tab.id] === "unlocked") {
    chrome.tabs.sendMessage(tab.id, { openSelection: true });
  } else {
    tabs[tab.id] = "pending";
  }
}

function handleMessage(request, sender, sendResponse) {
  // Re-sends messages accross entire tab, reaching in/out of frames
  if (request.tabMessage) {
    chrome.tabs.sendMessage(sender.tab.id, request.tabMessage);
  }

  if (request.tabLock) {
    if (tabs[sender.tab.id] !== "pending") {
      tabs[sender.tab.id] = "locked";
    }
  }

  if (request.tabUnlock) {
    if (tabs[sender.tab.id] === "pending") {
      chrome.tabs.sendMessage(sender.tab.id, { openSelection: true });
    }
    tabs[sender.tab.id] = "unlocked";
  }

  if (request.injectClearCodeFrame) {
    injectClearCodeFrame();
  }
}

chrome.runtime.onMessage.addListener(handleMessage);

chrome.action.onClicked.addListener(() => {
  injectClearCodeFrame();
  injectClearCodeButtons();
});

chrome.contextMenus.create({ id: "ctx-menu", title: "Open selection with Clear-Code", contexts: ["all"] });

chrome.contextMenus.onClicked.addListener(openSelection);
