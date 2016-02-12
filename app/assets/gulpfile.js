var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var webserver = require('gulp-webserver');
var opn       = require('opn');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var shell = require('gulp-shell');
var templateCache = require('gulp-angular-templatecache');

var sourcePaths = {
  styles: ['stylesheets/**/*.css'],
  script: ['javascripts/**/*.js'],
  images: ['images/**/*.*'],
  templates: ['templates/**/*.html']
};

var distPaths = {
	script: '../../public/assets/js',
	styles: '../../public/assets/css',
	images: '../../public/assets/images',
	templates: '../../public/assets/templates'
};

var server = {
  host: 'localhost',
  port: '3000'
};

gulp.task('images', function() {
	gulp.src( sourcePaths.images )
		.pipe(gulp.dest( distPaths.images ));
});

gulp.task('templates', function() {
	return gulp.src(sourcePaths.templates)
    .pipe(templateCache('templates.js', {
    	module: 'Hawks'
    }))
    .pipe(gulp.dest(distPaths.templates));	
});

gulp.task('start-server', shell.task(['rails s'], {verbose: true}));

gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port );
});

gulp.task('watch', function(){
 	//gulp.watch(sourcePaths.styles, ['sass']);
	//gulp.watch(sourcePaths.script, ['jsdev']);
	gulp.watch(sourcePaths.images, ['images']);
	gulp.watch(sourcePaths.templates, ['templates']);
});

gulp.task('build', ['images', 'templates']);
//gulp.task('production', ['sass', 'compress', 'cssconcat'])

gulp.task('default', ['build', 'start-server', 'watch', 'openbrowser']);
//gulp.task('release', ['production']);
