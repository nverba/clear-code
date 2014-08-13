var elements  = document.getElementsByTagName('pre');
var container = document.createElement('div');
container.id  = 'code-respect-container';


container.innerHTML = "" +
"<header id='code-respect-header'>" +
  "<button id='code-respect-pre-hide'>X</button>" +
"</header>" +
"<pre id='code-respect-pre'>" +
  "<code id='code-respect-code'></code>" +
"</pre>";

document.body.appendChild(container);

code = document.getElementById('code-respect-code');
pre  = document.getElementById('code-respect-pre');
hide = document.getElementById('code-respect-pre-hide');

hide.onclick = function (event) {
  container.style.display = 'none';
  event.preventDefault();
};

function openCode(element) {
  code.innerHTML = element.innerHTML;
  container.style.display = 'block';
  hljs.highlightBlock(code);
}

for (var i=0, max=elements.length; i < max - 1; i++) {
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
