var gulp = require('gulp'),
    http = require('http'),
    clean = require('gulp-clean'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    coffee = require('gulp-coffee'),
    wisp = require('gulp-wisp'),
    livereload = require('gulp-livereload'),
    embedlr = require('gulp-embedlr'),
    lr = require('tiny-lr'),
    express = require('express'),
    reloadServer = lr();

var opt= { minify: false };

gulp.task('clean', function() {
    return gulp.src('public/*')
           .pipe(clean());
});

gulp.task('assets', function() {
    return gulp.src('src/assets/**/*')
           .pipe(gulp.dest('public/assets/'))
           .pipe(livereload(reloadServer));
});

gulp.task('assets', function() {
    return gulp.src('src/vendor/**/*')
           .pipe(gulp.dest('public/vendor/'))
           .pipe(livereload(reloadServer));
});

gulp.task('jade',  function() {
    return gulp.src('src/**/*.jade')
           .pipe(plumber())
           .pipe(jade({pretty: true}))
           .pipe(embedlr())
           .pipe(gulp.dest('public/'))
           .pipe(livereload(reloadServer));
});

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
           .pipe(plumber())
           .pipe(embedlr())
           .pipe(gulp.dest('public/'))
           .pipe(livereload(reloadServer));
});


gulp.task('scripts_coffee', function() {
    return gulp.src('src/scripts/**/*.coffee')
           .pipe(plumber())
           .pipe(sourcemaps.init())
           .pipe(coffee({bare: true}))
           .pipe(sourcemaps.write('../maps'))
           .pipe(gulp.dest('public/js/'))
           .pipe(livereload(reloadServer));
});

gulp.task('scripts_wisp', function() {
    return gulp.src('src/scripts/**/*.wisp')
           .pipe(plumber())
           .pipe(wisp())
           .pipe(gulp.dest('public/js/'))
           .pipe(livereload(reloadServer));
});

gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
           .pipe(plumber())
           .pipe(gulp.dest('public/js/'))
           .pipe(livereload(reloadServer));
});

gulp.task('stylus', function() {
    return gulp.src('src/styles/**/*.styl')
           .pipe(plumber())
           .pipe(stylus({error: true}))
           .pipe(gulp.dest('public/css/'))
           .pipe(livereload(reloadServer));
});

gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.css')
           .pipe(plumber())
           .pipe(gulp.dest('public/css/'))
           .pipe(livereload(reloadServer));
});

gulp.task('serve', function() {
    var app = express();
    app.use(express.static('public'));
    app.listen(9001);

    reloadServer.listen(35729);
});

gulp.task('watch', function() {
    gulp.watch('src/assets/**/*', ['assets']);
    gulp.watch('src/vendor/**/*', ['vendor']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/scripts/**/*.js', ['scripts', 'html']);
    gulp.watch('src/styles/**/*.css', ['styles', 'html']);
});

gulp.task('watch_coffee', function() {
    gulp.watch('src/assets/**/*', ['assets']);
    gulp.watch('src/vendor/**/*', ['vendor']);
    gulp.watch('src/**/*.jade', ['jade']);
    gulp.watch('src/styles/**/*.styl', ['stylus']);
    gulp.watch('src/scripts/**/*.coffee', ['scripts_coffee']);
});

gulp.task('watch_wisp', function() {
    gulp.watch('src/assets/**/*', ['assets']);
    gulp.watch('src/vendor/**/*', ['vendor']);
    gulp.watch('src/jade/**/*.jade', ['jade']);
    gulp.watch('src/styles/**/*.styl', ['stylus']);
    gulp.watch('src/scripts/**/*.wisp', ['scripts_wisp']);
});

gulp.task('default', ['html',
                      'scripts',
                      'styles',
                      'assets',
                      'vendor',
                      'serve',
                      'watch']);

gulp.task('coffee', ['jade',
                     'stylus',
                     'scripts_coffee',
                     'assets',
                     'vendor',
                     'serve',
                     'watch_coffee']);

gulp.task('wisp', ['jade',
                   'stylus',
                   'scripts_wisp',
                   'assets',
                   'vendor',
                   'serve',
                   'watch_wisp']);
