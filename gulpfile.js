var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('./dist/')
    .pipe(webserver({
      port:8888,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('default',['webserver']);