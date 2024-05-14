const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify').default;
const zip = require('gulp-zip');
const browserSync = require('browser-sync').create();

const DEST_DIR = 'dist';

function build() {
    return gulp.src("src/game/**/*.js")
        .pipe(concat('game.js'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(DEST_DIR));
}

function devBuild() {
    return gulp.src("src/game/**/*.js")
        .pipe(concat('game.js'))
        .pipe(gulp.dest(DEST_DIR));
}

function releaseBuild() {
    return gulp.src("src/game/**/*.js")
        .pipe(concat('game.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DEST_DIR));
}

function start() {
    browserSync.init({
        proxy: "0.0.0.0:8000"
    });
    gulp.watch('src/**/*.js', gulp.series('devBuild'));
    gulp.watch('src/**/*.js').on('change', browserSync.reload);
}

function package() {
    const zipFiles = [
        "index.html",
        "dist/game.js",
        "src/lib/phaser/build/phaser.js",
        "assets/**/*"
    ];
    return gulp.src(zipFiles, { base : "." })
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('.'));
}

exports.build = build;
exports.devBuild = devBuild;
exports.releaseBuild = releaseBuild;
exports.start = start;
exports.package = gulp.series(releaseBuild, package);
