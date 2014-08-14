var elements = document.getElementsByTagName('pre');

function openCode(element) {
  var code = JSON.stringify(element.innerHTML);
  chrome.runtime.sendMessage({ openCode: code });
}

function injectButton(element) {
  var div    = document.createElement('div');
  var button = document.createElement('button');
  button.style.backgroundImage = 'url(' + chrome.extension.getURL("icons/icon19.png") + ')';
  button.className = 'code-respect';
  button.onclick = function () {
    openCode(element);
  };
  div.appendChild(button);
  element.appendChild(div);
}

for (var i=0, max=elements.length; i < max - 1; i++) {
  injectButton(elements[i]);
}

var iframe = document.createElement('iframe');
iframe.style.display = "none";
iframe.src = chrome.extension.getURL("code-respect-popup.html");
document.body.appendChild(iframe);
