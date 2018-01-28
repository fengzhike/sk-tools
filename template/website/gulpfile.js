const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
// const rollup = require('gulp-rollup');
// const replace = require('rollup-plugin-replace');

// 开发环境
gulp.task('builddev', () => {
    return watch('./src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeuii/**/*.js')
            .pipe(babel({
                babelrc: false,
                "plugins": [
                    "transform-decorators-legacy",
                    "transform-es2015-modules-commonjs"
                ]
            }))
            .pipe(gulp.dest('./build/'))
    })
});

// 上线环境
gulp.task('buildprod', () => {
    gulp.src('src/nodeuii/**/*.js')
        .pipe(babel({
            babelrc: false,
            // "ignore": ['./src/nodeuii/app.js'],
            "plugins": [
                "transform-decorators-legacy",
                "transform-es2015-modules-commonjs"
            ]
        }))
        /*.pipe(rollup({
            input: './src/nodeuii/app.js',
            format: 'cjs',
            "plugins": [
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production')
                })
            ]
        }))*/
        .pipe(gulp.dest('./build/'))
});

const _flag = (process.env.NODE_ENV == "production");

gulp.task('default', _flag ? ["buildprod"] : ["builddev"])