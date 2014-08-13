var sent;

if (!sent) {
  chrome.runtime.sendMessage({ popupMessage: "injectContentScripts" });
  sent = true;
}


