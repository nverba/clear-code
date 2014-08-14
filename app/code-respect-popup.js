var code  = document.getElementById('code-respect-code');
var hide  = document.getElementById('code-respect-frame-hide');

hide.onclick = function (event) {
  var frame = document.getElementById('code-respect-frame');
  frame.style.display = 'none';
  event.preventDefault();
};

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.openCode) {
    code.innerHTML = JSON.parse(request.openCode);
    hljs.highlightBlock(code);
  }
});
