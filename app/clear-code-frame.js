var hide  = document.getElementById('clear-code-frame-hide');

var js    = document.getElementById('beautify_js');
var html  = document.getElementById('beautify_html');
var css   = document.getElementById('beautify_css');
var reset = document.getElementById('beautify_reset');

var code  = "";

hide.onclick = function (event) {
  chrome.runtime.sendMessage({ tabMessage: { frame: { display: 'none' }}});
};
