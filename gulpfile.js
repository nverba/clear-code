var del           = require('del');
var gulp          = require('gulp');
var zip           = require('gulp-zip');
var dependencies  = Object.keys(require('./package.json').dependencies);
var libs          = dependencies.map(function (dep) {
                      return  './node_modules/' + dep + '/**/*.*';
                    });

var tests_libs    = ['node_modules/chai/chai.js'];

gulp.task('test:insert', function (cb) {
  return gulp.src(libs, { base: 'node_modules' })
    .pipe(gulp.dest('app/libs'));
});

gulp.task('test:flush', function (cb) {

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
