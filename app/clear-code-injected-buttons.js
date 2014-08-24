var elements = document.getElementsByTagName('pre');

function injectButton(element) {
  var div    = document.createElement('div');
  var button = document.createElement('button');
  button.style.backgroundImage = 'url(' + chrome.extension.getURL("icons/icon19.png") + ')';
  button.className = 'clear-code';
  button.onclick = function () {
    openCode(element);
  };
  div.appendChild(button);
  element.appendChild(div);
}

function openCode(element) {
  var code = JSON.stringify(element.innerText);
  chrome.runtime.sendMessage({ tabMessage: { openCode: code, frameDisplay: 'block' }});
}

for (var i=0, max=elements.length; i < max; i++) {
  injectButton(elements[i]);
}
