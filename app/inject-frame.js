var clear_code_frame_injected;

if (!clear_code_frame_injected) {

  chrome.runtime.sendMessage({ injectClearCodeFrame: "true" }, function(response) {
    clear_code_frame_injected = true;
  });
}
