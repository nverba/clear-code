var clear_code_buttons_injected;

if (!clear_code_buttons_injected) {

  chrome.runtime.sendMessage({ injectClearCodeButtons: "true" }, function(response) {
    clear_code_buttons_injected = true;
  });
}
