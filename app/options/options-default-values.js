angular.module('defaultOptions', []).value('default_options', {

  css_href: {
    style: {
      default: 'default.css',
      options: [
        'arta.css',
        'atelier-heath.light.css',
        'codepen-embed.css',
        'github.css',
        'magula.css',
        'pojoaque.css',
        'solarized_light.css',
        'vs.css',
        'ascetic.css',
        'atelier-lakeside.dark.css',
        'color-brewer.css',
        'googlecode.css',
        'mono-blue.css',
        'sunburst.css',
        'xcode.css',
        'atelier-dune.dark.css',
        'atelier-lakeside.light.css',
        'dark.css',
        'hybrid.css',
        'monokai.css',
        'railscasts.css',
        'tomorrow.css',
        'zenburn.css',
        'atelier-dune.light.css',
        'atelier-seaside.dark.css',
        'default.css',
        'idea.css',
        'monokai_sublime.css',
        'rainbow.css',
        'tomorrow-night-blue.css',
        'atelier-forest.dark.css',
        'atelier-seaside.light.css',
        'docco.css',
        'ir_black.css',
        'obsidian.css',
        'school_book.css',
        'tomorrow-night-bright.css',
        'atelier-forest.light.css',
        'brown_paper.css',
        'far.css',
        'kimbie.dark.css',
        'paraiso.dark.css',
        'tomorrow-night.css',
        'atelier-heath.dark.css',
        'foundation.css',
        'kimbie.light.css',
        'paraiso.light.css',
        'solarized_dark.css',
        'tomorrow-night-eighties.css'
      ]
    }
  },

  js: {

    indent_size: { default: 4, type: 'number', min: 1, max: 8 },
    indent_char: { default: " " },
    indent_level: { default: 0, type: 'number' },
    indent_with_tabs: { default: false, type: 'checkbox' },
    preserve_newlines: { default: true, type: 'checkbox' },
    max_preserve_newlines: { default: 10, type: 'number' },
    jslint_happy: { default: false, type: 'checkbox' },
    brace_style: { default: "collapse", options: ["collapse", "expand", "end-expand"]},
    keep_array_indentation: { default: false, type: 'checkbox' },
    keep_function_indentation: { default: false, type: 'checkbox' },
    space_before_conditional: { default: true, type: 'checkbox' },
    break_chained_methods: { default: false, type: 'checkbox' },
    eval_code: { default: false, type: 'checkbox' },
    unescape_strings: { default: false, type: 'checkbox' },
    wrap_line_length: { default: 0, type: 'number' }

  },

  html: {

    indent_inner_html: { default: false, type: 'checkbox' },
    indent_size: { default: 4, type: 'number' },
    indent_char: { default: " ", type: 'text' },
    brace_style: { default: "collapse", options: ["collapse", "expand", "end-expand"]},
    indent_scripts: { default: "normal", type: 'text' },
    wrap_line_length: { default: 250, type: 'number' },
    preserve_newlines: { default: false, type: 'checkbox' },
    max_preserve_newlines: { default: 10, type: 'number' },
    unformatted: { default: [] },
    indent_handlebars: { default: false, type: 'checkbox' }

  },

  css: {

    indent_size: { default: 4, type: 'number' },
    indent_char: { default: " ", type: 'text' }

  }
});
