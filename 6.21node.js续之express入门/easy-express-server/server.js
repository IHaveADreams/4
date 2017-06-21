// 快速开启一个服务.
require('express')().all('*',function (a,b) {
	b.sendfile(__dirname+a.url);
}).listen(8888,function () {
	console.log("success");
})