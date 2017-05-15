/**
 * Created by va00 on 10/05/2017.
 */
var gulp = require("gulp");
var babel = require("gulp-babel");
var babili = require("gulp-babili");
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
//var babel = require('babelify');

/*
var browserify = require('browserify');
var watchify = require('watchify');
*/
gulp.task('clean-js', function () {
    return gulp.src('dist/js', {read: false})
        .pipe(clean());
});
gulp.task('clean-css', function () {
    return gulp.src('dist/css', {read: false})
        .pipe(clean());
});
gulp.task('minify-css',['clean-css'], function() {
    gulp.src(['src/css/normalize.css','src/css/main.css'])
        .pipe(cleanCSS())
        .pipe(concat('styles-min.css'))
        .pipe(gulp.dest('dist/css'));
});
gulp.task("compile-js",['clean-js'], function () {
    return gulp.src(['src/js/vendor/jquery-3.2.1.min.js','src/js/main.js'])
        .pipe(concat('all-min.js', {newLine: ';'}))
        .pipe(babel())
        .pipe(babili({
            mangle: {
                keepClassNames: true
            }
        }))
        .pipe(gulp.dest("dist/js"));
});
gulp.task("compile",['minify-css',"compile-js"]);
