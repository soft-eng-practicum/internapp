'use strict';

var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var paths = {
  css: 'development/css/*.css',
  scripts : 'development/javascript/*.js'
};

var dest = {
    scripts: 'public/javascript/',
    css: 'public/stylesheet/' 
};

gulp.task('lint', function() {
  return gulp.src('./app/controllers/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

gulp.task('minify-css', function() {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.css));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(dest.scripts))
});

gulp.task('watch', function() {
    gulp.watch(paths.css, ['minify-css']);
    gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['minify-css', 'scripts', 'watch']);