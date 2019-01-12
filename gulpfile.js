'use strict'

const watchify = require('watchify')
const browserify = require('browserify')
const gulp = require('gulp')
const source = require('vinyl-source-stream')
const log = require('gulplog')
const buffer = require('vinyl-buffer')
<<<<<<< HEAD
const uglify = require('gulp-uglify')
=======
const terser = require('gulp-terser');
>>>>>>> e8a61b35328a8a55d189cbdfa44643872e3c1c53
const del = require('del')
const sass = require('gulp-sass')
const concatCss = require('gulp-concat-css')

sass.compiler = require('node-sass')

const bf = browserify({
	entries: ['./src/js/index.js'],
	debug: false,
	cache: {},
	packageCache: {},
	plugin: [],
	noParse: [ 'vue.js' ],
	transform: [
		[ require('vueify') ],
		[ require('babelify'), { presets: [ '@babel/preset-env' ] } ]
	]
})

bf.on('update', bundle) // on any dep update, runs the bundler
bf.on('log', log.info) // output build logs to terminal

gulp.task('js', ['clean'], bundle) // so you can run `gulp js` to build the file

function bundle() {
	return bf.bundle()
		.on('error', log.error.bind(log, 'Browserify Error'))
		.pipe(source('index.js'))
		.pipe(gulp.dest('./build/js'))
}

gulp.task('watchify', function () {
	bf.plugin(watchify)
})

<<<<<<< HEAD
gulp.task('build', ['clean'], function () {
=======
gulp.task('build', ['sass'], function () {
>>>>>>> e8a61b35328a8a55d189cbdfa44643872e3c1c53
	return gulp.src('src/index.html')
		.pipe(gulp.dest('./build'))
})

gulp.task('js-release', ['build'], function bundleRelease() {
	return bf.bundle()
		.on('error', log.error.bind(log, 'Browserify Error'))
		.pipe(source('index.js'))
		.pipe(buffer())
<<<<<<< HEAD
		.pipe(uglify())
		.on('error', log.error)
=======
		.pipe(terser())
>>>>>>> e8a61b35328a8a55d189cbdfa44643872e3c1c53
		.pipe(gulp.dest('./build/js'))
})

gulp.task('clean', function () {
	return del(['build/'])
});

<<<<<<< HEAD
gulp.task('sass', function() {
=======
gulp.task('sass', ['clean'], function() {
>>>>>>> e8a61b35328a8a55d189cbdfa44643872e3c1c53
	return gulp.src('./src/css/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concatCss('styles.css'))
		.pipe(gulp.dest('./build'))
})

gulp.task('sass:watch', function () {
	gulp.watch('./src/css/**/*.scss', ['sass'])
})

gulp.task('release', ['js-release'])
gulp.task('default', ['watchify', 'sass:watch', 'build', 'sass', 'js' ])
