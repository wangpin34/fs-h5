var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  gulp.src('lib/fs.js')
  	.pipe(uglify())
  	.pipe(gulp.dest('build'));
});