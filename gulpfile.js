/**
 * Created by Urko Villanueva on 10/05/2017.
 */
var gulp = require('gulp');
var babelify = require('babelify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');


gulp.task('compile-js',['clean-js'],function() {
    return browserify('./src/js/main.js')
        .transform(babelify)
        .bundle()
        .pipe(source('all.min.js'))
        .pipe(buffer())
      //  .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});
gulp.task('clean-js', function () {
    return gulp.src('dist/js', {read: false})
        .pipe(clean());
});
gulp.task('clean-css', function () {
    return gulp.src('dist/css', {read: false})
        .pipe(clean());
});
gulp.task('minify-css',['clean-css'], function() {
    gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css','node_modules/bootstrap/dist/css/bootstrap-theme.css','src/css/normalize.css','src/css/main.css'])
        .pipe(cleanCSS())
        .pipe(concat('styles-min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task("default",['minify-css',"compile-js"]);
gulp.watch('src/css/*.css', ['minify-css']);
//gulp.watch('src/js/**/*.js', ['compile-js']);

