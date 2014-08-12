if (!document.getElementById('code-respect-injected')) {

  chrome.runtime.sendMessage({ codeRespectRequest: "codeRespectInject" }, function(response) {

    var div = document.createElement('div');
    div.id  = 'code-respect-injected';
    document.body.appendChild(div);
  });
}
