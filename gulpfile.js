var gulp = require('gulp');
var sass = require('gulp-sass') ;
var notify = require("gulp-notify") ;
var bower = require('gulp-bower');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var connect = require('gulp-connect');



var paths = {
    assets: {
      src:    './assets'
    },
     bower:    './bower_components' ,
    css: {
      src:    './src/css/**/*.css',
      dest:   './public/css'
    },
    fonts: {
      dest:   './public/css/fonts'
    },
    img: {
      dest:   './public/img'
    },
    index: {
      src:    './src/index.html',
      dest:   './public'
    },
    js: {
      src:    './src/js/**/*',
      dest:   './public/js'
    },
    public:   './public/**/*',
     sass: {
      src:    './src/scss/**/*.scss',
      dest:   './public/css'
    },
}

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};



gulp.task('connect', function() {
  connect.server({
    port:           8085,
    root:           './public',
    livereload:     true
  });
});

gulp.task('clean', [], function(callback) {
    del([paths.public], callback);
});

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(paths.bower)) 
});

gulp.task('sass', function () {
  return gulp
    .src(paths.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('copy-css', function() {
  gulp.src(paths.css.src)
    .pipe(gulp.dest(paths.css.dest));
});

gulp.task('copy-assets', function() {
  gulp.src(paths.assets.src + '/Monoqi_logo/**/*')
    .pipe(gulp.dest(paths.img.dest));
  gulp.src(paths.assets.src + '/Teaser_images/**/*')
    .pipe(gulp.dest(paths.img.dest));
  gulp.src(paths.assets.src + '/Monoqi_webfont/fonts/**/*')
    .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('copy-index', function() {
  gulp.src(paths.index.src)
    .pipe(gulp.dest(paths.index.dest));
});

gulp.task('copy-js', function() {
  gulp.src(paths.js.src)
    .pipe(gulp.dest(paths.js.dest));
  gulp.src(paths.bower + '/bootstrap-sass/assets/javascripts/bootstrap.min.js')
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('copy', ['copy-css', 'copy-assets', 'copy-index', 'copy-js']);

gulp.task('watch', function() {
  gulp.watch(paths.sass.src, ['sass']); 
  gulp.watch(paths.index.src, ['copy-index']); 
});

  gulp.task('default', ['bower', 'sass', 'copy', 'watch', 'connect']);
