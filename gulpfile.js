var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var insert = require('gulp-insert');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var header = 
`/* --------------------------------------------------
jQuery Quick Modal v2.0.0

By Kevin Beronilla
http://www.kevinberonilla.com

Fork on GitHub
https://github.com/kevinberonilla/jquery-quick-modal

Free to use under the MIT license
http://www.opensource.org/licenses/mit-license.php
-------------------------------------------------- */
`;

gulp.task('minify:css', () => {
    return gulp.src(['./css/*.css', '!./css/*.min.css'])
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./css'));
});

gulp.task('minify:js', () => {
    return gulp.src(['./js/*.js', '!./js/*.min.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./js'));
});

gulp.task('insert:comments:css', () => {
    return gulp.src(['./css/*.min.css'])
        .pipe(insert.prepend(header))
        .pipe(gulp.dest('./css'));
});

gulp.task('insert:comments:js', () => {
    return gulp.src(['./js/*.min.js'])
        .pipe(insert.prepend(header))
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', () => {
    gulp.watch(['./css/*.css', '!./css/*.min.css'], ['minify:css']);
    gulp.watch(['./js/*.js', '!./js/*.min.js'], ['minify:js']);
    gulp.watch(['./css/*.min.css'], ['insert:comments:css']);
    gulp.watch(['./js/*.min.js'], ['insert:comments:js']);
});

gulp.task('default', () => {
    return runSequence('minify:css', 'minify:js', 'insert:comments:css', 'insert:comments:js', 'watch');
});