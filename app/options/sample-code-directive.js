OptionsApp.directive('sampleCode', function () {
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
