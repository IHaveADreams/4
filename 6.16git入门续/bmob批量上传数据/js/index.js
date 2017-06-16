
$(function () {
	// 项目配置区域
	var ApplicationId = "b79683a142e5948c8f8765f27fafac7a";
	var ApiKey = "8ff617a4abb78626a70a17a83495424a";
	// 数据表名(也就是你的每次发起请求的接口名)
	var tableNames = ["Products","GameScore",'user'];


	// 数据表的渲染
	var tableName = tableNames[0];
	for(var i = 0;i<tableNames.length;i++){
		$('<option></option>').html(tableNames[i]).appendTo($('select'));
	}

	// 数据源
	var objArr = [];
	// 初始化数据库 这里需要修改成你自己的appID 和 KEy
		Bmob.initialize(ApplicationId,ApiKey);
	// 添加一行数据 这里需要修改为你自己的数据表名
	var List = Bmob.Object.extend(tableName);

	$('select').change(function () {
		if ($(this).val()) {
			tableName = $(this).val();
			console.log(tableName);
			// 添加一行数据 这里需要修改为你自己的数据表名
			List = Bmob.Object.extend(tableName);
		}
	})
	// 输入域的初始化
	$('textarea').val("				请输入包含对象的数据:\n				[\n					{\n						username:'张三',\n						password:'123'\n					},\n					{\n						username:'李四',\n						password:'456'\n					}\n				]");
	// 获取/失去焦点
	$('textarea').focus(function () {
		$(this).val('');
	}).blur(function () {
		if (!$(this).val().length) {
			// $(this).html("请输入包含对象的数据:[{username:'张三',password:'123'},{username:'李四',password:'456'}]");
			$(this).val("				请输入包含对象的数据:\n				[\n					{\n						username:'张三',\n						password:'123'\n					},\n					{\n						username:'李四',\n						password:'456'\n					}\n				]");
		}
	})
	
	// 声明成功或失败的显示信息
		var msg = '';
	// 封装方法,发送并保存数据
	function sendData(data) {

		var listObj = new List();
		// console.log(data);
		listObj.save(data,{
			success:function () {
				msg = msg + '\n' + 'success';
				$('textarea').val(msg);
			},
			error:function () {
				msg = msg + '\n' + 'fail';
				$('textarea').val(msg);
			}
		})
	}
	// 新增数据
	$('#addBtn').click(function () {
		try{
			objArr = JSON.parse($('textarea').val());
		}catch(error){
			alert('表闹!数据的格式有问题');
			return;
		}finally{
			// console.log(1);
		}
		if (!Array.isArray(objArr)) {
			alert('表闹!数据我解析了,根本就不是数组!');
			return;
		}
		// 清空信息
			msg = '';
		// 数据正确,开始上传
		// for(var i = 0;i<objArr.length;i++){
		// 	var obj = objArr[i];
		// 	setTimeout(function () {
				
		// 	},10000);
		// 	sendData(obj);
		// }
		var count = 0;
		var t = setInterval(function () {
			if (count == objArr.length) {
				clearInterval(t);
				return;
			}
			var obj = objArr[count];
			sendData(obj);
			count++;
		},600)
	})
	// 列表页
	$('#listBtn').on('click',refreshList);
	// 声明刷新列表页的函数
	function refreshList() {
		var listArr = [];
		$('table').empty();
		// 实例化一个查询对象
				var query = new Bmob.Query(List);
				// 查询最新的数据
				// query.greaterThan('time',currentTime);
				// 使用创造时间的节点降序排列
				// query.descending("createdAt");
				// 限制返回的数据为10条
				// query.limit(10);
				// 开始查询
				query.find({
					success:function (data) {
						
						for(var i = 0;i<data.length;i++){
							var obj = data[i].attributes;
							console.log(data[i]);
							if (!i) {
								// 标题
								var num = Object.keys(obj).length +1;
								var tr = $('<tr></tr>');
								$('<td></td>').html('序号').appendTo(tr);
								for(var key in Object.keys(obj)){
									$('<td></td>').html(Object.keys(obj)[key]).css('width',(1/num)*100+'%').appendTo(tr);
								}
								$('<td></td>').html('编辑').appendTo(tr);
								tr.appendTo($('table'));
							}

							var tr = $('<tr></tr>');
								$('<td></td>').html(i+1).appendTo(tr);
							for(var key in obj){
								$('<td></td>').html(obj[key]).css('width',(1/num)*100+'%').appendTo(tr);
							}
							$('<td class="editBtn"></td>').html('删除').attr('editId',data[i].id).appendTo(tr);
							tr.appendTo($('table'));
						}			
						// 给删除按钮绑定方法
						$('.editBtn').click(function () {
							console.log($(this).attr('editId'));
							var query = new Bmob.Query(tableName);
						    query.get($(this).attr('editId'), {
						      success: function(object) {
						        // The object was retrieved successfully.
						        object.destroy({
						          success: function(deleteObject) {
						          	alert("delete success");
						          	refreshList();
						          },
						          error: function(GameScoretest, error) {
						          	alert("delete fail");
						          }
						        });
						      },
						      error: function(object, error) {
						        alert("query object fail");
						      }
						    });


						})

					},
					error:function (error) {
						alert('查询失败了!');
					}
				})
	}
})
