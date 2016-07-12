var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

gulp.task('default', function() {
  gulp.src('src/fs.js')
  	.pipe(sourcemaps.init())
  	.pipe(babel())
  	.pipe(uglify())
  	.pipe(rename('fs.min.js'))
  	.pipe(sourcemaps.write('.'))
  	.pipe(gulp.dest('dist'));
});