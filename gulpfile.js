var gulp           = require('gulp');
var karma          = require('karma').server;
var zip            = require('gulp-zip');

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

gulp.task('zip', function () {
  return gulp.src('app/**/*')
    .pipe(zip('app.zip'))
    .pipe(gulp.dest(''));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['karma']);
