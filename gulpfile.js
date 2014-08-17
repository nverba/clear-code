var gulp           = require('gulp');
var concat         = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var karma          = require('karma').server;

gulp.task('bower', function() {
  return gulp.src(mainBowerFiles(/* options */))
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./app/scripts'));
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

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['bower']);
