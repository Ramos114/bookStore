
$.get('/ajax/male',function(d){
	obj =JSON.parse(d); 
	new Vue({
		el:'#app',
		data:{ 
			weclome:obj.items[0].data.data, 
			editer:obj.items[1].data.data,
			newbooks:obj.items[2].data.data, 
			goodbooks:obj.items[3].data.data

		}
	});
});