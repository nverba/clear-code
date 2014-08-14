var codeRespectInjected;

if (!codeRespectInjected) {

  chrome.runtime.sendMessage({ background: "codeRespectInject" }, function(response) {
    codeRespectInjected = true;
  });
}
