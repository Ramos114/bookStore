
new Vue({
	el:'#appSearch',
	data:{
		val:'',
		rData:[],
		vshow:true,
	},
	file
	methods:{
		searchBtn:function(e){
			var keyword = this.val;
			$.get('/ajax/search',{keyword:keyword},function(d){
				this.val = ""; 
				this.vshow = false;

				this.rData = d.items;    
				console.log(this.rData); 
			},'json');
		}
	}
});