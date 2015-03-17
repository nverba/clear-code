var del     = require('del');
var gulp    = require('gulp');
var zip     = require('gulp-zip');
var libs    = [
                './node_modules/angular/angular.js',
                './node_modules/angular-chrome-options/dist/**/*.*',
                './node_modules/chrome-bootstrap/chrome-bootstrap.css',
                './node_modules/google-code-prettify/bin/prettify.min.js',
                './node_modules/js-beautify/js/lib/**/*.*'
              ];

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
gulp.task('default', []);
