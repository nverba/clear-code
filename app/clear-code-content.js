var elements = document.getElementsByTagName('pre');
var iframe = document.createElement('iframe');
    iframe.id = 'clear-code-frame';
    iframe.src = chrome.extension.getURL("clear-code-frame.html");
    iframe.scrolling = "no";
    iframe.draggable = 'true';
    iframe.style.display = 'none';

document.body.appendChild(iframe);

function openCode(element) {
  var code = JSON.stringify(element.innerText);
  chrome.runtime.sendMessage({ tabMessage: { openCode: code } });
  iframe.style.display = 'block';
}

function injectButton(element) {
  var div    = document.createElement('div');
  var button = document.createElement('button');
  button.style.backgroundImage = 'url(' + chrome.extension.getURL("icons/icon19.png") + ')';
  button.className = 'clear-code';
  button.onclick = function () {
    openCode(element);
    console.log(element);
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

  if (request.openSelection) {

    chrome.runtime.sendMessage({ tabMessage: { openCode: JSON.stringify(window.getSelection().toString()) } });
    iframe.style.display = 'block';
  }
});
