var del           = require('del');
var gulp          = require('gulp');
var zip           = require('gulp-zip');
var inject        = require('gulp-inject');
var dependencies  = Object.keys(require('./package.json').dependencies);
var libs          = dependencies.map(function (dep) {
                      return  './node_modules/' + dep + '/**/*.*';
                    });

var tests_libs    = ['node_modules/chai/chai.js'];

var paths = {
  testTarget: 'app/features/iframe/content/',
  testSources: 'app/tests/**/*.js'
};

gulp.task('tests:inject', function () {
  return gulp.src(tests_libs, { base: 'node_modules' })
    .pipe(gulp.dest('app/tests'));
});

gulp.task('tests:flush', ['tests:unlink'], function (cb) {
  del(['app/tests'], cb);
});

gulp.task('tests:insert', ['tests:inject'], function () {

  return gulp.src(paths.testTarget + 'index.html')
    .pipe(inject(gulp.src(paths.testSources, {read: false}), {relative: true}))
    .pipe(gulp.dest(paths.testTarget));
});

gulp.task('tests:unlink', function () {

  return gulp.src(paths.testTarget + 'index.html')
    .pipe(inject(gulp.src(paths.testSources, {read: false}), {
      transform: function (filePath, file) {
        return '';
      }
    }))
    .pipe(gulp.dest(paths.testTarget));
});

gulp.task('app:clean', function (cb) {
  del(['app/libs/**'], cb);
});

gulp.task('app:build', ['app:clean'], function () {
  return gulp.src(libs, { base: 'node_modules' })
    .pipe(gulp.dest('app/libs'));
});

gulp.task('zip', ['test:flush'], function () {
  return gulp.src('app/**/*')
    .pipe(zip('app.zip'))
    .pipe(gulp.dest(''));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['karma']);
