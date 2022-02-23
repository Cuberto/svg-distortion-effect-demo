/*!
 * Gulp SMPL Layout Builder
 *
 * @version 7.3.1 (lite)
 * @author Artem Dordzhiev (Draft) | Cuberto
 * @type Module gulp
 */

/* Get plugins */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const $ = require('gulp-load-plugins')({pattern: ['gulp-*', 'gulp.*', 'del']});
const webpack = require('webpack-stream');
const sass = require('gulp-sass')(require('sass'));

/* Primary tasks */
gulp.task('default', (done) => {
    gulp.series('serve')(done)
});

gulp.task('serve', (done) => {
    gulp.series('clean', gulp.parallel('pug', 'sass', 'js'), 'browsersync', 'watch')(done)
});

/* Pug task */
gulp.task('pug', () => {
    return gulp.src(['./src/pug/**/*.pug', '!./src/pug/_includes/**/*'])
        .pipe($.plumber())
        .pipe($.pug({
            pretty: true,
            basedir: "./src/pug/"
        }))
        .pipe(gulp.dest('./tmp/')).on('end', () => {
            browserSync.reload();
        });
});

/* Sass task */
gulp.task('sass', () => {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass({
            "includePaths": "node_modules"
        }))
        .pipe($.autoprefixer())
        .pipe(gulp.dest('./tmp/assets/css/'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

/* JS task */
gulp.task('js', () => {
    return gulp.src(['./src/js/**/*'])
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./tmp/assets/js'));
});

/* Browsersync Server */
gulp.task('browsersync', (done) => {
    browserSync.init({
        server: ["./tmp", "./src/static"],
        notify: false,
        ui: false,
        online: false,
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: false
        }
    });
    done();
});

/* Watcher */
gulp.task('watch', () => {
    global.isWatching = true;

    gulp.watch("./src/scss/**/*.scss", gulp.series('sass'));
    gulp.watch("./src/pug/**/*.pug", gulp.series('pug'));
    gulp.watch("./src/js/**/*.*", gulp.series('js'));
    gulp.watch("./config.json", gulp.parallel('pug', 'js'));
});

/* FS tasks */
gulp.task('clean', () => {
    return $.del(['./tmp/**/*'], {dot: true});
});
