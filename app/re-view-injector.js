var codeRespectInjected;

if (!codeRespectInjected) {

  chrome.runtime.sendMessage({ injectCodeRespect: "true" }, function(response) {
    codeRespectInjected = true;
  });
}
