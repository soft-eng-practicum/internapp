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


function lint(cb) {
    gulp.src('./app/controllers/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
    cb();
}

function minify_css(cb) {
    gulp.src(paths.css)
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(dest.css));
    cb();
}

function scripts(cb) {
    gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(dest.scripts));
    cb();
}

gulp.task('lint-scripts', gulp.series(lint, scripts));

gulp.task('watch', function() {
    gulp.watch([paths.css], minify_css);
    gulp.watch([paths.scripts], scripts);
});

gulp.task('default',
          gulp.series( gulp.parallel('lint-scripts', minify_css),
                       'watch' ));
