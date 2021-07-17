/**
 TechLead - Responsive Professional Modern HTML5 CV and Resume Template
 **/
'use strict';

const {
    src,
    dest,
    series,
    watch
} = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const bs = require('browser-sync').create();
const npmDist = require('gulp-npm-dist');
const htmlInjector = require('bs-html-injector');
sass.compiler = require('node-sass');

// Compile scss files to style.css file
function compileStyle() {
    return src('./scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./assets/css'))
        .pipe(bs.stream());
}

// Compile and minify scss files to style.css file
function minifyStyle() {
    return src('./scss/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('./assets/css'))
        .pipe(bs.stream());
}


exports.compileStyle = compileStyle;
exports.minifyStyle = minifyStyle;

// Start a server
function startServer() {
    bs.use(htmlInjector, {
        files: "**/*.html"
    });

    // Now init the Browsersync server
    bs.init({
        injectChanges: true,
        server: true
    });

    // Listen to change events on HTML and reload
    watch('**/*.html').on('change', htmlInjector);

    // Provide a callback to capture ALL events to CSS
    watch('scss/**/*.scss', series(compileStyle, minifyStyle));
}

exports.start = startServer;

// Copy dependencies to template/vendors
function init() {
    return src(npmDist(), {
            base: './node_modules/'
        })
        .pipe(rename(function(path) {
            path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
        }))
        .pipe(dest('./vendors'));
}

exports.init = init;