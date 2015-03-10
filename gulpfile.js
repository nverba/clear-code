var del           = require('del');
var gulp          = require('gulp');
var karma         = require('karma').server;
var zip           = require('gulp-zip');
var dependencies  = Object.keys(require('./package.json').dependencies);
var libs          = dependencies.map(function (dep) {
                      return  './node_modules/' + dep + '/**/*.*';
                    });

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

gulp.task('app:clean', function (cb) {
  del(['app/libs/**'], cb);
});

gulp.task('app:build', ['app:clean'], function () {
  return gulp.src(libs, { base: 'node_modules' })
    .pipe(gulp.dest('app/libs'));
});

gulp.task('zip', function () {
  return gulp.src('app/**/*')
    .pipe(zip('app.zip'))
    .pipe(gulp.dest(''));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['karma']);
