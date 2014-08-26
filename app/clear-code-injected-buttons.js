var elements = document.getElementsByTagName('pre');

function injectButton(element) {
  var div    = document.createElement('div');
  var button = document.createElement('button');
  button.style.backgroundImage = 'url(' + chrome.extension.getURL("icons/icon19.png") + ')';
  button.className = 'clear-code';
  button.innerText = "Open with Clear Code";
  button.onclick = function () {
    openCode(element);
  };
  div.className = "clear-code-top-button";
  div.appendChild(button);
  element.parentElement.insertBefore(div, element.nextSibling);
}

function openCode(element) {
  var code = JSON.stringify(element.innerText);
  chrome.runtime.sendMessage({ tabMessage: { openCode: code, frameDisplay: 'block' }});
}

for (var i=0, max=elements.length; i < max; i++) {
  injectButton(elements[i]);
}
