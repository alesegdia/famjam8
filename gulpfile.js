var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
 	zip = require('gulp-zip'),
	browser_sync = require('browser-sync').create();

var DEST_DIR = 'dist';

gulp.task('build', function() {
	return gulp.src("src/game/**/*.js")
	.pipe(concat('game.js'))
	.pipe(uglify())
	.pipe(rename({extname: '.min.js'}))
	.pipe(gulp.dest(DEST_DIR));
});

gulp.task('dev-build', function () {
	return gulp.src("src/game/**/*.js")
		.pipe(concat('game.js'))
		.pipe(gulp.dest(DEST_DIR));
});

gulp.task('release-build', function() {
	return gulp.src("src/game/**/*.js")
		.pipe(concat('game.js'))
		.pipe(uglify())
		.pipe(gulp.dest(DEST_DIR));
});

gulp.task('start', function() {
	browser_sync.init({
			proxy: "0.0.0.0:8000"
	});
	gulp.watch('src/**/*.js', ['dev-build']);
	gulp.watch('src/**/*.js').on('change', browser_sync.reload);
});

gulp.task('default', ['dev-build'], function(){

});

gulp.task('package', ['release-build'], function() {
	var zip_files = [
		"index.html",
		"dist/game.js",
		"src/lib/phaser/build/phaser.js",
		"assets/**/*"
	];
	gulp.src(zip_files, { base : "." })
		.pipe(zip('dist.zip'))
		.pipe(gulp.dest('.'));
});
