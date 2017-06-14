// 这个文件就是用来编写任务的.
// 注入gulp依赖
	var gulp = require('gulp');
// 注入gulp-sass插件
	var sass = require('gulp-sass');
// 注入browser-sync插件
	var browser = require('browser-sync');

// 创建我的第一个任务
	gulp.task('myLog',function () {
		console.log('我的第一个任务完成了!');
	});
// 创建一个sass编译的任务
	gulp.task('sass',function(){
		return gulp.src('app/scss/*.scss')
		.pipe(sass())	// 调用sass方法来编译
		.pipe(gulp.dest('app/css'))
		.pipe(browser.reload({stream:true}));
	})
// 创建一个任务
	gulp.task('browser',function(){
		return browser({
			server:{
				baseDir:'app'
			}
		})
	})
// 用watch任务来监听文件的改变
	gulp.task('watch',['sass','browser'],function () {
		gulp.watch('app/scss/*.scss',['sass']);
		gulp.watch('app/js/*.js',browser.reload);
		gulp.watch('app/*.html',browser.reload);
	})

// 创建一个default任务
	gulp.task('default',['browser','sass','watch']);





