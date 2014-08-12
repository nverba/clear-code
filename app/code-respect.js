var elements = document.getElementsByTagName("pre");

for (var i=0, max=elements.length; i < max; i++) {
  injectButton(elements[i]);
}

function openCode(element) {

}

function injectButton(element) {
  var div    = document.createElement('div');
  var button = document.createElement('button');
  button.style.backgroundImage = 'url(' + chrome.extension.getURL("icons/icon19.png") + ')';
  button.className = 'code-respect';
  div.appendChild(button);
  element.appendChild(div);
}
