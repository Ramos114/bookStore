
$.get('/ajax/rank',function(d){
	var obj =JSON.parse(d); 
	for(var i =0; i<obj.items.length; i++){
		//把字符串解析成数组
		obj.items[i].description = obj.items[i].description.split('\n'); 
	}

	new Vue({
		el:'#app',
		data:{ 
			rank:obj.items, 
		}
	});
});