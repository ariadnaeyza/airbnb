var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
/*var pump = require('pump');*/

gulp.task('lab', function(){
  console.log("Hola");
});

gulp.task('webserver', function() {
  gulp.src('public/')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('sass', function () {
  // gulp.src("source/css/*.scss")
  //   .pipe(sass())
  //   .pipe(gulp.dest("public/stylesheets/"));
  return gulp.src('./source/css/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets'));
});

/*gulp.task('compress', function (cb) {
  pump([
        gulp.src('./source/css/main.scss'),
        uglify(),
        gulp.dest('./public/stylesheets')
    ],
    cb
  );
});*/

gulp.task('default', ['sass', 'webserver'/*, 'compress'*/]);