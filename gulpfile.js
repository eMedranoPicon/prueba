// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var autoprefixer = require('gulp-autoprefixer'),
  cache = require('gulp-cache'),
  concat = require('gulp-concat'),
  consolidate = require('gulp-consolidate'),
  del = require('del'),
  ghelp = require('gulp-showhelp'),
  iconfont = require('gulp-iconfont'),
  jshint = require('gulp-jshint'),
  karma = require('gulp-karma'),
  minifycss = require('gulp-minify-css'),
  notify = require('gulp-notify'),
  path = require('path'),
  rename = require('gulp-rename'),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  sassdoc = require('sassdoc'),
  scsslint = require('gulp-scss-lint'),
  shell = require('gulp-shell'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify');

var src_app = './app',
  src_base_dir = './app/assets',
  src_js_files = [
    path.join(src_base_dir, 'js/plugins', '**', '*.js'),
    path.join(src_base_dir, 'js', '*.js')
  ],
  tests_js_files = path.join(src_base_dir, 'test/specs', 'js', '*.js'),
  src_sass_files = path.join(src_base_dir, 'sass', '**', '*.scss'),

  dist_base_dir = './app/dist',
  dist_js_dir = path.join(dist_base_dir, 'js'),
  dist_css_dir = path.join(dist_base_dir, 'css'),
  dist_html_dir = path.join(src_app, 'templates'),
  src_html_files = path.join(dist_html_dir, '**', '*.html'),
  config_dir = './config',

  vendor_js_src = [
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.min.js',
    './bower_components/jQuery.mmenu/dist/js/jquery.mmenu.min.all.js',
    './bower_components/jquery-ui/jquery-ui.min.js',
    './bower_components/flip/dist/jquery.flip.min.js'
  ],
  vendor_css_src = [
    './bower_components/bootstrap/dist/css/bootstrap.min.css'
  ],
  vendor_source_maps = [
    './bower_components/jquery/dist/jquery.min.map',
    './bower_components/progressbar.js/dist/progressbar.min.js.map'
  ];

gulp.task('jshint', function() {
  return gulp.src(src_js_files)
    .pipe(jshint(path.join(config_dir, 'dev.jshintrc')))
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }));
}).help = 'Analyzes js code quality with jshint according default config file.';


gulp.task('jshint-dist', function() {
  return gulp.src(src_js_files)
    .pipe(jshint(path.join(config_dir, 'dist.jshintrc')))
    .pipe(jshint.reporter('jshint-stylish'));
}).help = 'Analyzes js code quality with jshint according dist config file.';


gulp.task('sass', function() {
  return gulp.src(src_sass_files)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded',
      sourceComments: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 3 version', 'ie >= 10']
    }))
    .pipe(gulp.dest(dist_css_dir));
}).help = 'Compiles and autoprefixes sass source files.';


gulp.task('sass-min', function() {
  return gulp.src(src_sass_files)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed',
      sourceComments: false
    }))
    .pipe(autoprefixer({
      browsers: ['last 3 version', 'ie >= 10']
    }))
    .pipe(minifycss())
    .pipe(gulp.dest(dist_css_dir));
}).help = 'Compiles, minifies and autoprefixes sass source files.';


gulp.task('sass-lint', function() {
  gulp.src(src_sass_files)
    .pipe(scsslint({
      config: path.join(config_dir, 'scss-lint.yml')
    }));
}).help = 'Analyzes css code quality with scsslint.';


gulp.task('vendor-scripts', function() {
  gulp.src(vendor_source_maps)
    .pipe(gulp.dest(dist_js_dir));

  return gulp.src(vendor_js_src)
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(dist_js_dir));
}).help = 'Concatenates javascript vendor files.';

gulp.task('scripts', function() {
  return gulp.src(src_js_files)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(dist_js_dir));
}).help = 'Concatenates all js files.';


gulp.task('scripts-min', function() {
  return gulp.src(src_js_files)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist_js_dir));
}).help = 'Concatenates and minifies all js files.';


gulp.task('watch', function() {
  gulp.watch(src_js_files, ['jshint', 'scripts']);
  gulp.watch(src_sass_files, ['sass-lint', 'sass']);
  gulp.watch(src_html_files, ['jinja']);
}).help = 'Keeps watching for changes in sass (trigger jshint and scripts) and javascript (trigger sass).';

gulp.task('clean', function(cb) {
  del([dist_js_dir, dist_css_dir], cb);
}).help = 'Removes files in css and javascript destination folders.';

gulp.task('clean-sass', function(cb) {
  del(dist_css_dir, cb);
}).help = 'Removes files in css destination folder.';

gulp.task('clean-js', function(cb) {
  del(dist_css_dir, cb);
}).help = 'Removes files in javascript destination folder.';

gulp.task('clean-templates', function(cb) {
  del(dist_html_dir, cb);
}).help = 'Removes files in html destination folder.';

gulp.task('help', function() {
  ghelp.show();
}).help = 'Shows this help message.';

gulp.task('test', function() {
  return gulp.src(tests_js_files)
    .pipe(karma({
      configFile: path.join(config_dir, 'karma.conf.js'),
      action: 'watch'
    }));
}).help = 'Runs the test suite and watch for changes.';

gulp.task('test-dist', function() {
  return gulp.src(tests_js_files)
    .pipe(karma({
      configFile: path.join(config_dir, 'karma.conf.js'),
      action: 'run',
      browsers: ['Chrome', 'Firefox', 'Opera', 'PhantomJS']
    }));
}).help = 'Runs once the test suite in all browsers.';

gulp.task('jinja', function() {
  return gulp.src('', {
      read: false
    })
    .pipe(shell(['python3 ./build.py']));
});

gulp.task('images', function() {
  return gulp.src(['app/assets/images/**/*']).pipe(gulp.dest('app/dist/images'));
});

gulp.task('fonts', function() {
  return gulp.src(['app/assets/fonts/**/*']).pipe(gulp.dest('app/dist/fonts'));
});

gulp.task('old_browsers', function() {
  return gulp.src(['app/assets/js/old_browsers_support/**/*']).pipe(gulp.dest('app/dist/js/old_browsers_support'));
});

gulp.task('legacy-code', function() {
  return gulp.src(['app/legacy/*/*']).pipe(gulp.dest('app/dist/legacy'));
});

gulp.task('connect', function() {
  return connect.server({
    root: './app/dist',
    port: 7000,
    livereload: false
  });
});

gulp.task('default', function() {
  runSequence(
    ['old_browsers', 'fonts', 'images', 'sass-lint', 'jshint', 'sass', 'vendor-scripts', 'scripts', 'jinja', 'legacy-code'],
    ['watch', 'connect'], // by default test are excluded of default task but it could be included with 'test' task
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
    ['old_browsers', 'jshint-dist', 'sass-lint', 'sass-min', 'vendor-scripts', 'scripts-min', 'jinja', 'legacy-code'],
    function() {
      gulp.src('').pipe(notify({
        title: 'Dist',
        message: 'Build task done!'
      }));
    }
  );
}).help = 'Build assets for production. Executes clean, sass-min, jshint-dist, vendor-scripts and scripts.';
