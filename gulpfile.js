var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var webpack = require('gulp-webpack');
var sourcemaps = require('gulp-sourcemaps');
var named = require('vinyl-named');
var rename = require('gulp-rename');

gulp.task('build', function() {
  gulp.src('src/*.js')
  	.pipe(babel())
  	.pipe(gulp.dest('distribution'));
});