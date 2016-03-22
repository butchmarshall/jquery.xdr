var fs = require('fs'),
concat = require('gulp-concat'),
rename = require('gulp-rename'),
umd = require('gulp-umd'),
uglify = require('gulp-uglify'),
gulp = require('gulp');

gulp.task('default', [
  'minify'
]);

gulp.task('watch', function() {
	gulp.watch('./src/**/*', ['default']);
});

gulp.task('minify', function() {
	gulp.src([
		'./src/*.js'
	])
	.pipe(concat('jquery.xdr.js'))
	.pipe(umd({
		dependencies: function() {
			return [
				{
					name: 'jQuery',
					cjs: 'jquery',
					amd: 'jquery',
					global: 'jQuery'
				}
			]
		},
		exports: function() {
			return 'jQuery.XDR';
		},
		namespace: function() {
			return 'jQuery.XDR';
		}
	}))
	.pipe(gulp.dest('./dist/'))
	.pipe(uglify())
	.pipe(rename('jquery.xdr.min.js'))
	.pipe(gulp.dest('./dist/'));
});