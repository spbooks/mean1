var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');
var jshint = require('gulp-jshint');

var jsSource = './assets/javascript/';

gulp.task('css', function() {
  gulp.src('./assets/style/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(concat('main.css', {
      newLine: ''
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('javascript', function() {
  gulp.src([jsSource + 'mainapp.js',
  jsSource + 'edit_controller.js',
  jsSource + 'view_controller.js'])
    .pipe(concat('main.js'))
    .pipe(wrap('(function(a, window){<%= contents %>}(angular, window));'))
    .pipe(jshint({
      predef: ['window', 'angular']
    }))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('./public/javascript'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascript'))
});

gulp.task('watch', function() {
  gulp.watch('./assets/javascript/*.js', ['javascript']);
	gulp.watch('./assets/style/*.styl', ['css']);
});

gulp.task('default', function() {
  gulp.start('css');
  gulp.start('javascript');
});
