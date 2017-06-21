var gulp = require('gulp');
var sass = require('gulp-sass');

// 配置编译任务
gulp.task('sass',function () {
	return gulp.src('app/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'));
})