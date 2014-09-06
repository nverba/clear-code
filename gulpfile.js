var gulp           = require('gulp');
var karma          = require('karma').server;

gulp.task('karma', function (done) {
  karma.start(karmaCommonConf, done);
});

var karmaCommonConf = {

  browsers: ['Chrome', 'Chromium'],
  frameworks: ['mocha', 'chai', 'chai-as-promised'],
  autoWatch: true,
  files: [
    'app/**/**/*.js'
  ],
  client: {
    mocha: {
      ui: 'bdd'
    }
  }
};

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['karma']);
