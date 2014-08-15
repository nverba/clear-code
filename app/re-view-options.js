var style = document.getElementById('hljs-style');

chrome.storage.local.get({ 'highlight_css_link': 'default' }, function (response) {
  style.value = response.highlight_css_link;
});

style.onchange = function (new_style) {
  chrome.storage.local.set({ 'highlight_css_link': style.value });
};

