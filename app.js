var koa = require("koa");
var controller = require("koa-route");
var app = koa();

//访问服务
var service = require("./service/webAppService.js");   

//设置页面渲染路径与格式
var views = require("co-views");
var render = views('./view',{
	map : { html:'ejs'}
});



//设置静态文件访问
var koa_static = require("koa-static-server");
app.use(koa_static({
	rootDir:'./static',
	rootPath:'/static', //url直接访问 
	maxage:0  //缓存
}))

//路由返回页面:测试
app.use(controller.get("/ejs_test",function*(){
	this.body = yield render("test",{title:"I'am a ejs!"});  
}));
 
//路由返回页面:首页
app.use(controller.get("/",function*(){
	this.body = yield render("index",{title:"首页"});  
}));
//路由返回页面:男生专场
app.use(controller.get("/male",function*(){ 
	this.body = yield render("male",{title:"男生专场"});   
}));
//路由返回页面:女生专场
app.use(controller.get("/female",function*(){
	this.body = yield render("female",{title:"女生专场"});  
}));
//路由返回页面:分类
app.use(controller.get("/category",function*(){
	this.body = yield render("category",{title:"首页"});  
}));
//路由返回页面:排行
app.use(controller.get("/rank",function*(){
	this.body = yield render("rank",{title:"排行"});  
}));
 


//路由返回测试数据
app.use(controller.get("/route_1",function*(){
	this.body = "hi my koa!!";
})); 

//路由返回获取本地数据 
app.use(controller.get("/api_data",function*(){
	this.body = service.get_test_data(); 
}));

//路由设置：返回首页数据
app.use(controller.get("/ajax/index",function*(){
	this.body = service.get_index_data();   
}));

app.use(controller.get("/ajax/male",function*(){
	this.body = service.get_male_data();
}));

app.use(controller.get("/ajax/female",function*(){
	this.body = service.get_female_data();
}));

//路由设置：返回排行榜数据
app.use(controller.get("/ajax/rank",function*(){
	this.body = service.get_rank_data();   
}));

//路由设置：返回图书的标签数据
app.use(controller.get("/ajax/backet",function*(){
	this.body = service.get_backet_data();   
}));

//路由设置：返回图书类别数据
app.use(controller.get("/ajax/category",function*(){
	this.body = service.get_category_data(); 
}));

//路由设置：图书数据
app.use(controller.get("/ajax/book",function*(){
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if (!id) {
		id = "18218";
	}
	this.body = service.get_book_data(id);  

}));

//路由设置：搜索接口
app.use(controller.get("/ajax/search",function*(){
	//使用querystring反解 
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start,end,keyword);  
}));


//监听接口
app.listen(3001);

console.log("server start 3001!");



