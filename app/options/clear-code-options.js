var Options = angular.module('Options', []);

Options.controller('HeadController', function HeadController($scope, $timeout) {

  function refresh() {
    // refresh each pre block to force css re-paint on mouse-up;
    angular.forEach(document.getElementsByTagName('pre'), function (tag) {
      $timeout(function function_name () {
        tag.style.display = 'block';
      }, 10);
    });
  }

  chrome.storage.local.get({ 'highlight_css_link': 'default' }, function (response) {
    $scope.$apply(function () {
      $scope.highlighterStyle = { url: chrome.extension.getURL('highlight/styles/' + response.highlight_css_link)};
    });
  });

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (!changes.highlight_css_link) { return; }

    $scope.$apply(function () {
      $scope.highlighterStyle.url = chrome.extension.getURL('highlight/styles/' + changes.highlight_css_link.newValue);
      refresh();
    });
  });
});

Options.controller('OptionsController', function OptionsController($scope) {

  var js_beautifier_defaults = {

    "indent_size": 4,
    "indent_char": " ",
    "indent_level": 0,
    "indent_with_tabs": false,
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "jslint_happy": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0

  };

  $scope.menu    = ['Highlighter', 'JS Beautifier', 'HTML Beautifier', 'CSS Beautifier'];
  $scope.active  = { name: $scope.menu[0] };
  $scope.options = ['arta.css', 'atelier-heath.light.css', 'codepen-embed.css', 'github.css', 'magula.css', 'pojoaque.css', 'solarized_light.css', 'vs.css', 'ascetic.css', 'atelier-lakeside.dark.css', 'color-brewer.css', 'googlecode.css', 'mono-blue.css', 'sunburst.css', 'xcode.css', 'atelier-dune.dark.css', 'atelier-lakeside.light.css', 'dark.css', 'hybrid.css', 'monokai.css', 'railscasts.css', 'tomorrow.css', 'zenburn.css', 'atelier-dune.light.css', 'atelier-seaside.dark.css', 'default.css', 'idea.css', 'monokai_sublime.css', 'rainbow.css', 'tomorrow-night-blue.css', 'atelier-forest.dark.css', 'atelier-seaside.light.css', 'docco.css', 'ir_black.css', 'obsidian.css', 'school_book.css', 'tomorrow-night-bright.css', 'atelier-forest.light.css', 'brown_paper.css', 'far.css', 'kimbie.dark.css', 'paraiso.dark.css', 'tomorrow-night.css', 'atelier-heath.dark.css', 'foundation.css', 'kimbie.light.css', 'paraiso.light.css', 'solarized_dark.css', 'tomorrow-night-eighties.css'];

  $scope.resetJS = function (argument) {
    angular.forEach(js_beautifier_defaults, function (value, key) {
      $scope.js_beautifier[key] = value;
    });
  };

  chrome.storage.local.get({ 'highlight_css_link': 'default' }, function (response) {
    $scope.$apply(function () {
      $scope.highlighterStyle = { active: response.highlight_css_link };
    });
  });

  chrome.storage.local.get({ 'js_beautifier': js_beautifier_defaults }, function (response) {
    $scope.$apply(function () {
      $scope.js_beautifier = response.js_beautifier;
    });
  });

  $scope.makeActive = function (value) {
    $scope.active.name = value;
  };

  $scope.selectUp = function () {
    $scope.highlighterStyle.active = $scope.options[$scope.options.indexOf( $scope.highlighterStyle.active ) - 1];
  };

  $scope.selectDown = function () {
    $scope.highlighterStyle.active = $scope.options[$scope.options.indexOf( $scope.highlighterStyle.active ) + 1];
  };

  $scope.$watch('highlighterStyle.active', function (newVal, oldVal) {
    if (newVal === oldVal) return;
    chrome.storage.local.set({ 'highlight_css_link': newVal });
  });

  $scope.$watchCollection('js_beautifier', function (newVals, oldVals) {
    chrome.storage.local.set({ 'js_beautifier': newVals });
  });
});

Options.directive('sampleCode', function () {
  'use strict';

  return {

    restrict: 'A',
    scope: {},
    link: function (scope, elem, attrs) {

      elem[0].innerHTML = "//comment...! \n\nvar elements = document.getElementsByTagName('div'); \nvar sample = {}; \n\nfunction SampleFunction() { \n  console.log('hello world'); \n}";
      hljs.highlightBlock(elem[0]);
    }
  };
});
