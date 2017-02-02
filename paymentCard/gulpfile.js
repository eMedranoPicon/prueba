
var gulp            = require('gulp');
var path            = require('path');
var jshint          = require('gulp-jshint');
var autoprefixer    = require('gulp-autoprefixer');
var sass            = require('gulp-sass');
var minifycss       = require('gulp-minify-css');
var runSequence     = require('run-sequence');
var concat          = require('gulp-concat');
var shell           = require('gulp-shell');
var connect         = require('gulp-connect');
var notify          = require('gulp-notify');
var del             = require('del');
var uglify          = require('gulp-uglify');
var zip             = require('gulp-zip');
var argv            = require('yargs').argv;
var prompt          = require('gulp-prompt');
var release         = require('gulp-github-release');



var config_dir      = './config';
var src_app         = './app';
var src_assets      = path.join(src_app, 'assets');
var src_vendor      = path.join(src_assets, 'vendor');
var src_dist        = path.join(src_app, 'dist');


var src_js_old_browsers     = path.join(src_vendor, 'js/old_browsers_support', '**', '*');
var src_js_files            = path.join(src_assets, 'js', '**', '*.js');
var src_sass_desktop        = path.join(src_assets, 'sass', 'styles-desktop.scss');
var src_sass_phone          = path.join(src_assets, 'sass', 'styles-phone.scss');
var src_sass                = path.join(src_assets, 'sass', '**', '*.scss');
var src_js                  = path.join(src_assets, 'js', '**', '*.js');
var src_fonts               = path.join(src_assets, 'fonts', '**');
var src_images              = path.join(src_assets, 'images', '**');
var src_html_files          = path.join(src_app, 'templates', '**', '*.html');

var src_dist_js_old_browsers    = 'js/old_browsers_support';
var src_dist_css                = 'css';
var src_dist_js                 = 'js';
var src_dist_fonts              = 'fonts';
var src_dist_images             = 'images';
var src_dist_desktop            = path.join(src_dist, 'desktop');
var src_dist_phone              = path.join(src_dist, 'phone');

var release_base_dir = './release';

var vendor_source_maps  = [
    './bower_components/jquery/dist/jquery.min.map',
    './bower_components/progressbar.js/dist/progressbar.min.js.map'
];
var vendor_js_src       = [
    './bower_components/jquery/jquery.min.js',
    './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.min.js',
    './bower_components/jquery-ui/jquery-ui.min.js'
];


gulp.task('clean', function(cb) {
    del([src_dist], cb)
}).help = 'Removes files in css and javascript destination folders.';

gulp.task('old_browsers', function() {
    return gulp
        .src([src_js_old_browsers])
        .pipe(gulp.dest(path.join(src_dist_desktop, src_dist_js_old_browsers)))
        .pipe(gulp.dest(path.join(src_dist_phone, src_dist_js_old_browsers)));
});

gulp.task('jshint-dist', function() {
    return gulp
        .src(src_js_files)
        .pipe(jshint(path.join(config_dir, 'dist.jshintrc')))
        .pipe(jshint.reporter('jshint-stylish'));
}).help = 'Analyzes js code quality with jshint according dist config file.';

gulp.task('sass-desktop-min', function() {
    return gulp
        .src(src_sass_desktop)
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed',
            sourceComments: false
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 version', 'ie >= 10']
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(path.join(src_dist_desktop, src_dist_css)));
}).help = 'Compiles, minifies and autoprefixes sass desktop source files.';
gulp.task('sass-phone-min', function() {
    return gulp
        .src(src_sass_phone)
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed',
            sourceComments: false
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 version', 'ie >= 10']
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(path.join(src_dist_phone, src_dist_css)));
}).help = 'Compiles, minifies and autoprefixes sass phone source files.';
gulp.task('sass-min', function() {
    runSequence(['sass-desktop-min', 'sass-phone-min']);
}).help = 'Compiles, minifies and autoprefixes sass source files.';

gulp.task('sass-desktop', function() {
    return gulp
        .src(src_sass_desktop)
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed',
            sourceComments: false
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 version', 'ie >= 10']
        }))
        .pipe(gulp.dest(path.join(src_dist_desktop, src_dist_css)));
}).help = 'Compiles, minifies and autoprefixes sass desktop source files.';
gulp.task('sass-phone', function() {
    return gulp
        .src(src_sass_phone)
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed',
            sourceComments: false
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 version', 'ie >= 10']
        }))
        .pipe(gulp.dest(path.join(src_dist_phone, src_dist_css)));
}).help = 'Compiles, minifies and autoprefixes sass phone source files.';
gulp.task('sass', function() {
    runSequence(['sass-desktop-min', 'sass-phone-min']);
}).help = 'Compiles, minifies and autoprefixes sass source files.';

gulp.task('vendor-scripts', function() {
    gulp.src(vendor_source_maps)
        .pipe(gulp.dest(path.join(src_dist_desktop, src_dist_js)))
        .pipe(gulp.dest(path.join(src_dist_phone, src_dist_js)));

    return gulp.src(vendor_js_src)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(path.join(src_dist_desktop, src_dist_js)))
        .pipe(gulp.dest(path.join(src_dist_phone, src_dist_js)));
}).help = 'Concatenates javascript vendor files.';

gulp.task('scripts-min', function() {
    return gulp
        .src(src_js)
        .pipe(concat('scripts-app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(src_dist_desktop, src_dist_js)))
        .pipe(gulp.dest(path.join(src_dist_phone, src_dist_js)));
}).help = 'Concatenates and minifies all js files.';

gulp.task('fonts', function() {
    return gulp
        .src(src_fonts)
        .pipe(gulp.dest(path.join(src_dist_desktop, src_dist_fonts)))
        .pipe(gulp.dest(path.join(src_dist_phone, src_dist_fonts)));
}).help = 'Copy fonts files.';

gulp.task('images', function() {
    return gulp
        .src(src_images)
        .pipe(gulp.dest(path.join(src_dist_desktop, src_dist_images)))
        .pipe(gulp.dest(path.join(src_dist_phone, src_dist_images)));
}).help = 'Copy images files.';

gulp.task('scripts', function() {
    return gulp
        .src(src_js)
        .pipe(concat('scripts-app.js'))
        .pipe(gulp.dest(path.join(src_dist_desktop, src_dist_js)))
        .pipe(gulp.dest(path.join(src_dist_phone, src_dist_js)));
}).help = 'Concatenates and minifies all js files.';

gulp.task('jinja', function() {
    return gulp
        .src('', {
            read: false
        })
        .pipe(shell(['python3 ./build.py']));
});


gulp.task('watch', function() {
    gulp.watch(src_js, ['jshint-dist', 'scripts']);
    gulp.watch(src_sass, ['sass']);
    gulp.watch(src_html_files, ['jinja']);
}).help = 'Keeps watching for changes in sass (trigger jshint and scripts) and javascript (trigger sass).';

gulp.task('connect', function() {
    return connect.server({
        root: './app/dist',
        port: 7000,
        livereload: false
    });
});



gulp.task('create-release-zip', function() {
    return gulp
        .src(path.join(src_dist, '**', '*'), argv)
        .pipe(zip(release_version + '.zip'))
        .pipe(gulp.dest(release_base_dir));
}).help = 'Create a zip with contains the release';

gulp.task('upload-release', function() {
    gulp
    .src('')
    .pipe(prompt
        .prompt([{
            type: 'input',
            name: 'token',
            message: 'Please, insert a token string.'
        }], function(res){
            gulp
                .src([path.join(release_base_dir, release_version + '.zip')])
                .pipe(release({
                    token: res.token,
                    tag: release_version,
                    manifest: require('./package.json')
                }));
        })
    );
}).help = 'Upload the release to the repository';

gulp.task('create-release', function(cb) {
    if (!argv.release) {
        return;
    }
    del([release_base_dir], cb);
    gulp
        .src('')
        .pipe(prompt
            .prompt([{
                type: 'input',
                name: 'version',
                message: 'Please, insert the version of release (v0.0.0).'
            }], function(res){
                release_version = res.version;
                runSequence(
                    ['create-release-zip'],
                    ['upload-release']
                );
            })
        );
}).help = 'Create and complete all process to upload a release on the repository';


gulp.task('default', function() {
    runSequence(
        ['old_browsers', 'jshint-dist', 'fonts', 'images', 'sass', 'vendor-scripts', 'scripts', 'jinja'],
        ['watch', 'connect'],
        function() {
            gulp.src('').pipe(notify({
                title: 'Development',
                message: 'Built task done, now watching for changes...'
            }));
        }
    );
}).help = 'Build assets for development. Executes jshint, sass, vendor-scripts and scripts. Keeps watching for changes';


gulp.task('dist', function() {
    runSequence(
        'clean',
        ['old_browsers', 'jshint-dist', 'fonts', 'images', 'sass-min', 'vendor-scripts', 'scripts-min', 'jinja'],
        'create-release', // if has tag --release , create and upload the release, else pass
        function() {
            gulp.src('').pipe(notify({
                title: 'Dist',
                message: 'Build task done!'
            }));
        }
      );
}).help = 'Build asset for production. Executes clean, sass-min, jshint-dist, vendor-scripts and scripts.';
