var elements = document.getElementsByTagName("pre");
var pre  = document.createElement('pre');
var code = document.createElement('code');

pre.id  = 'code-respect-pre';
pre.style.display = 'none';
code.id = 'code-respect-code';
pre.appendChild(code);
document.body.appendChild(pre);

function openCode(element) {
  code.innerText = js_beautify(element.innerText);
  pre.style.display = 'block';
}

for (var i=0, max=elements.length; i < max; i++) {
  injectButton(elements[i]);
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
