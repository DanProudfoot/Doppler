var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var changed = require('gulp-changed');
var parallel = require('concurrent-transform');
var os = require('os');
var rename = require('gulp-rename');
var notify = require('gulp-notify');

var config = {
	sass: './dist/css/style.scss',
	sass2: './dist/css/other/welcome.scss',
	hd_images: './dist/media/hd/*.{png,jpg,jpeg}',
	build: './dist/css/built',
	hd_min: './dist/media/hd/min'
}


gulp.task('sass', function(){
	return sass(config.sass)
	.pipe(prefix({
		browsers: ['last 2 versions'],
		cascade: true
	}))
	.on("error", notify.onError({
		message: 'Error: <%= error.message %>'
	}))
	.pipe(csso())
	.pipe(gulp.dest( config.build ))
	;
});

gulp.task('welcome', function(){
	return sass(config.sass2)
	.pipe(prefix({
		browsers: ['last 2 versions'],
		cascade: true
	}))
	.on("error", notify.onError({
		message: 'Error: <%= error.message %>'
	}))
	.pipe(csso())
	.pipe(gulp.dest( config.build ))
	;
});

gulp.task('watch', function(){
	gulp.watch('./dist/css/**/*.scss', ['sass']);
	gulp.watch('./dist/css/other/**/*.scss', ['welcome']);
});

gulp.task('default', ['sass']);