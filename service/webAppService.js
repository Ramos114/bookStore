var fs = require('fs');

//暴露测试数据接口：get_test_data
exports.get_test_data = function(){
	var content = fs.readFileSync('./mock/test.json', 'utf-8');
	return content; 
}

//主页数据的接口
exports.get_index_data = function(){
	var content = fs.readFileSync('./mock/home.json', 'utf-8'); 
	return content; 
}

//排行榜的接口
exports.get_rank_data = function(){
	var content = fs.readFileSync('./mock/rank.json', 'utf-8'); 
	return content; 
}

//男生女生频道
exports.get_male_data = function(){
	var content = fs.readFileSync('./mock/channel/male.json', 'utf-8'); 
	return content;
}
exports.get_female_data = function(){
	var content = fs.readFileSync('./mock/channel/female.json', 'utf-8'); 
	return content;
}

//图书类别的接口
exports.get_category_data = function(){
	var content = fs.readFileSync('./mock/category.json', 'utf-8');
	return content; 
}

//书签的接口
exports.get_backet_data = function(){
	var content = fs.readFileSync('./mock/bookbacket.json', 'utf-8'); 
	return content;
}

//书籍详情接口
exports.get_book_data = function(id){
	if (!id) {
		id = "18218";
	}
	var content = fs.readFileSync('./mock/book/'+id+'.json', 'utf-8'); 
	return content;
}



//搜索接口(小米服务器端的)
exports.get_search_data = function(start,end,keyword){
	return function(callback){
		var http = require('http');
		var qs = require('querystring');  //http请求格式转换
		var data = {
			s:keyword,
			start:start,
			end:end,
		};
		var content = qs.stringify(data);

		//一个请求数据
		var http_request = {
			hostname:'dushu.xiaomi.com',
			port:80,
			path:'/store/v0/lib/query/onebox?' + content
		};

		//新建发送对象
		req_obj = http.request(http_request,function(_res){
			var res_content = "";
			_res.setEncoding('utf8');  //返回数据的格式

			//返回数据后都会执行data方法
			_res.on("data",function(chunk){
				res_content += chunk;  //不断拼接返回的数据
			});

			//end表示所有数据都返回了
			_res.on("end",function(){
				callback(null,res_content); 
			});

		});

		req_obj.on('error',function(){

		});

		req_obj.end();  //发送请求


	}
}