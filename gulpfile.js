var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    argv = require('yargs').argv,
    gulpif     = require('gulp-if'),
    less       = require('gulp-less'),
    minifyCSS  = require('gulp-minify-css');
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    livereloadport = 35729,
    serverport = 5000,
    templateCache = require('gulp-angular-templatecache');

// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist' });
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/scripts/*.js')
  .pipe(jshint())
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});
 
gulp.task('default', function () {
  return gulp.src('app/**/*.html')
    .pipe(templateCache('templates.js',{standalone: true}))
    .pipe(gulp.dest('dist/js'));
});
// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  //gulp.src(['app/scripts/main.js'])
  return browserify('app/scripts/main.js')
  .bundle()
  // Bundle to a single file
  .pipe(source('bundle.js'))
  .pipe(buffer())
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['lint'], function() {
  // Watch our scripts
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'lint',
    'browserify'
  ]);
});

//CSS Task

gulp.task('css',function(){
  return gulp.src('app/styles/styles.less')
  .pipe(less())
  .pipe(gulpif(argv.production, minifyCSS({keepBreaks:true})))
  .pipe(gulp.dest('dist/css/'))
})

// Watch CSS

gulp.task('watchCSS',function(){
  gulp.watch(['app/styles/styles.less'],[
    'css'
  ]);
})

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'));

  // Any other view files from app/views
  gulp.src('./app/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'))
  .pipe(refresh(lrserver));
});

gulp.watch(['app/index.html', 'app/views/**/*.html'], [
  'views'
]);

// Dev task
gulp.task('dev', function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.start(['watch','default','css','watchCSS']);
});
