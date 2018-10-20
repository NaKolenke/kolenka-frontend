'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var hbsfy = require('hbsfy');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var log = require('gulplog');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var del = require('del');

var b = browserify({
    entries: ['./src/js/index.js'],
    debug: false,
    cache: {},
    packageCache: {},
    plugin: []
});

b.transform(hbsfy);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', log.info); // output build logs to terminal

gulp.task('watchify', function () {
    b.plugin(watchify)
})

gulp.task('build', ['clean'], function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('./build'));
})

gulp.task('js-release', ['build'], bundleRelease);

gulp.task('clean', function () {
    return del(['build/']);
});

gulp.task('release', ['js-release'])

gulp.task('default', ['watchify', 'build', 'js']);

function bundle() {
    return b.bundle()
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source('index.js'))
        .pipe(gulp.dest('./build/js'));
}

function bundleRelease() {
    return b.bundle()
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(uglify())
        .on('error', log.error)
        .pipe(gulp.dest('./build/js'));
}
