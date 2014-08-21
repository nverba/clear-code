var clear_code_injected;

if (!clear_code_injected) {

  chrome.runtime.sendMessage({ injectClearCode: "true" }, function(response) {
    clear_code_injected = true;
  });
}
