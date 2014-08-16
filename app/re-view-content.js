var elements = document.getElementsByTagName('pre');
var iframe = document.createElement('iframe');
    iframe.id = 're-view-frame';
    iframe.src = chrome.extension.getURL("re-view-frame.html");
    iframe.scrolling = "no";
    iframe.draggable = 'true';
    iframe.style.display = 'none';

document.body.appendChild(iframe);

function openCode(element) {
  var code = JSON.stringify(element.innerHTML);
  chrome.runtime.sendMessage({ tabMessage: { openCode: code } });
  iframe.style.display = 'block';
}

function injectButton(element) {
  var code   = element.getElementsByTagName('code')[0];
  var div    = document.createElement('div');
  var button = document.createElement('button');
  button.style.backgroundImage = 'url(' + chrome.extension.getURL("icons/icon19.png") + ')';
  button.className = 're-view';
  button.onclick = function () {
    openCode(code);
  };
  div.appendChild(button);
  element.appendChild(div);
}

for (var i=0, max=elements.length; i < max; i++) {
  injectButton(elements[i]);
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.frame) {
    if (request.frame.display) {
      iframe.style.display = request.frame.display;
    }
  }
});
