Options.controller('OptionsController', function OptionsController($scope) {

  $scope.js_beautifier_defaults = {

    "indent_size": { default: 4, type: 'number', min: 1, max: 8 },
    "indent_char": { default: " " },
    "indent_level": { default: 0, type: 'number' },
    "indent_with_tabs": { default: false, type: 'checkbox' },
    "preserve_newlines": { default: true, type: 'checkbox' },
    "max_preserve_newlines": { default: 10, type: 'number' },
    "jslint_happy": { default: false, type: 'checkbox' },
    "brace_style": { default: "collapse", options: ["collapse", "expand", "end-expand"]},
    "keep_array_indentation": { default: false, type: 'checkbox' },
    "keep_function_indentation": { default: false, type: 'checkbox' },
    "space_before_conditional": { default: true, type: 'checkbox' },
    "break_chained_methods": { default: false, type: 'checkbox' },
    "eval_code": { default: false, type: 'checkbox' },
    "unescape_strings": { default: false, type: 'checkbox' },
    "wrap_line_length": { default: 0, type: 'number' }

  };

  $scope.html_beautifier_defaults = {

    "indent-inner-html": { default: false, type: 'checkbox' },
    "indent-size": { default: 4, type: 'number' },
    "indent-char": { default: " ", type: 'text' },
    "brace_style": { default: "collapse", options: ["collapse", "expand", "end-expand"]},
    "indent-scripts": { default: "normal", type: 'text' },
    "wrap-line-length": { default: 250, type: 'number' },
    "preserve-newlines": { default: false, type: 'checkbox' },
    "max-preserve-newlines": { default: 10, type: 'number' },
    "unformatted": { default: [] }

  };

  $scope.css_beautifier_defaults = {

    "indent-size": { default: 4, type: 'number' },
    "indent-char": { default: " ", type: 'text' }

  };

  $scope.menu    = ['Highlighter', 'JS Beautifier', 'HTML Beautifier', 'CSS Beautifier'];
  $scope.active  = { name: $scope.menu[0] };
  $scope.style_options = ['arta.css', 'atelier-heath.light.css', 'codepen-embed.css', 'github.css', 'magula.css', 'pojoaque.css', 'solarized_light.css', 'vs.css', 'ascetic.css', 'atelier-lakeside.dark.css', 'color-brewer.css', 'googlecode.css', 'mono-blue.css', 'sunburst.css', 'xcode.css', 'atelier-dune.dark.css', 'atelier-lakeside.light.css', 'dark.css', 'hybrid.css', 'monokai.css', 'railscasts.css', 'tomorrow.css', 'zenburn.css', 'atelier-dune.light.css', 'atelier-seaside.dark.css', 'default.css', 'idea.css', 'monokai_sublime.css', 'rainbow.css', 'tomorrow-night-blue.css', 'atelier-forest.dark.css', 'atelier-seaside.light.css', 'docco.css', 'ir_black.css', 'obsidian.css', 'school_book.css', 'tomorrow-night-bright.css', 'atelier-forest.light.css', 'brown_paper.css', 'far.css', 'kimbie.dark.css', 'paraiso.dark.css', 'tomorrow-night.css', 'atelier-heath.dark.css', 'foundation.css', 'kimbie.light.css', 'paraiso.light.css', 'solarized_dark.css', 'tomorrow-night-eighties.css'];

  $scope.makeActive = function (value) {
    $scope.active.name = value;
  };

  $scope.selectUp = function () {
    $scope.highlighterStyle.active = $scope.style_options[$scope.style_options.indexOf( $scope.highlighterStyle.active ) - 1];
  };

  $scope.selectDown = function () {
    $scope.highlighterStyle.active = $scope.style_options[$scope.style_options.indexOf( $scope.highlighterStyle.active ) + 1];
  };

  function getDefaults(source) {
    var result = {};
    Object.keys(source).map(function(value, index) {
       result[value] = source[value].default;
    });
    return result;
  }

  chrome.storage.local.get({ 'highlight_css_link': 'default' }, function (response) {
    $scope.$apply(function () {
      $scope.highlighterStyle = { active: response.highlight_css_link };
    });
  });

  chrome.storage.local.get({ 'js_beautifier': getDefaults($scope.js_beautifier_defaults) }, function (response) {
    $scope.$apply(function () {
      $scope.js_beautifier = response.js_beautifier;
    });
  });

  chrome.storage.local.get({ 'html_beautifier': getDefaults($scope.html_beautifier_defaults) }, function (response) {
    $scope.$apply(function () {
      $scope.html_beautifier = response.html_beautifier;
    });
  });

  chrome.storage.local.get({ 'css_beautifier': getDefaults($scope.css_beautifier_defaults) }, function (response) {
    $scope.$apply(function () {
      $scope.css_beautifier = response.css_beautifier;
    });
  });

  $scope.$watch('highlighterStyle.active', function (newVal, oldVal) {
    if (newVal === oldVal) return;
    chrome.storage.local.set({ 'highlight_css_link': newVal });
  });

  $scope.$watchCollection('js_beautifier', function (newVals, oldVals) {
    chrome.storage.local.set({ 'js_beautifier': newVals });
  });

  $scope.$watchCollection('html_beautifier', function (newVals, oldVals) {
    chrome.storage.local.set({ 'html_beautifier': newVals });
  });

  $scope.$watchCollection('css_beautifier', function (newVals, oldVals) {
    chrome.storage.local.set({ 'css_beautifier': newVals });
  });
});
