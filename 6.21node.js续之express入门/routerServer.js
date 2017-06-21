// 注入http模块
var http = require('http');
// 注入url模块
var url = require('url');
// 配置一个服务
http.createServer(function (req,res) {
	// 获取url路径
	var path = url.parse(req.url).pathname;
	

	if ('/boy' == path) {
		res.write('I\'m a boy');
	} else if('/girl' == path){
		res.write('I\'m a girl');
	}else{
		res.write('404');
	}


	res.end();
}).listen(8888);
console.log('server success');