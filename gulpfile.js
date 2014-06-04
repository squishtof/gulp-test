var gulp = require('gulp'),
    watch = require('gulp-watch'),
    http = require('http'),
    livereload = require('gulp-livereload'),
    embedlr = require('gulp-embedlr'),
    lr = require('tiny-lr'),
    ecstatic = require('ecstatic'),
    reloadServer = lr()

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
           .pipe(embedlr())
           .pipe(gulp.dest('public/'))
           .pipe(livereload(reloadServer));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
           .pipe(gulp.dest('public/js/'))
           .pipe(livereload(reloadServer));
});

gulp.task('styles', function() {
    return gulp.src('src/css/**/*.css')
           .pipe(gulp.dest('public/css/'))
           .pipe(livereload(reloadServer));
});

gulp.task('serve', function() {
    http.createServer(ecstatic({ root: __dirname + '/public' }))
    .listen(9001)

    reloadServer.listen(35729);
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/css/**/*.css', ['styles']);
});

gulp.task('default', ['html', 'scripts', 'styles', 'serve', 'watch']);
