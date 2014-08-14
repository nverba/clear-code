var elements = document.getElementsByTagName('pre');
var iframe = document.createElement('iframe');
    iframe.id  = 'code-respect-frame';
    iframe.src = chrome.extension.getURL("code-respect-popup.html");
    iframe.style.display = 'none';

document.body.appendChild(iframe);

function openCode(element) {
  var code = JSON.stringify(element.innerHTML);
  chrome.runtime.sendMessage({ openCode: code });
  iframe.style.display = 'block';
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

for (var i=0, max=elements.length; i < max; i++) {
  injectButton(elements[i]);
}
