var id = location.href.split('?id=').pop();

$.get('/ajax/book?id='+id,function(d){
	d = JSON.parse(d);
	
	new Vue({
		el:'#app',
		data:{
			book:d.item,
			related:d.related,
			author_book:d.author_books,
		},
		methods:{
			readBook:function(){ 
				location.href="/reader"; 
			}
		}

	})

});