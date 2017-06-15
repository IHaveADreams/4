// 注入gulp依赖
var gulp = require('gulp');
// 注入gulp-useref依赖
var useref = require('gulp-useref');
// 注入gulp-uglify依赖
var uglify = require('gulp-uglify');

// 创建js拼接任务
gulp.task('useref',function () {
	return gulp.src('app/*.html')
	.pipe(useref()) // html引入的js进行拼接
	.pipe(gulp.dest('dist'))
})

// 创建js的丑化任务
gulp.task('uglify',function () {
	return gulp.src('dist/js/*.js')
	.pipe(uglify()) // 压缩并丑化代码
	.pipe(gulp.dest('dist/minjs'))
})