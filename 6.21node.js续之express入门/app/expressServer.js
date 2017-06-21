// 注入express模块
	var express = require('express');
// 实例化
	var app = express();

// 设置静态文件(css,js,图片)路径
	app.use(express.static('public'));

// 客户机访问根目录
	app.get('/',function (request,response) {
		// 返回数据
		// response.send('欢迎来的德玛西亚!');
		// 返回一个登录页面  __dirname 表示服务文件所在的路径
		response.sendfile( __dirname + '/index.html');
	})
	app.get('/login',function(request,response){
		// 拿到用户名和密码
		var username = request.query.username;
		var password = request.query.password;

		if ('aaa' == username && 123456 == password) {
			response.sendfile(__dirname+'/success.html')
		} else {
			response.sendfile(__dirname+'/fail.html')
		}
	})
// 创建服务
	var server = app.listen(8888,function(){
		console.log('服务已启动');
	})