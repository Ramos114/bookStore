var window_with = document.body.offsetWidth;

var searchVue = new Vue({
	el:'#app',
	data:{
		val:'',
		rData:[],
		tags:['111','美女','大美女','超级大美女','一代枭雄'],
		v_tags_show:true,
		v_data_show:false,
		v_s_show:false,
		w_width: window_with,
	},
	methods:{
		// 搜索
		searchBtn:function(e){
			if (this.val == '') {
				
				return; 
			}
			var keyword = this.val;
			this.tags.push(this.val);
			this.v_tags_show = false;

			$.get('/ajax/search',{keyword:keyword},function(d){

				if (d.count >0) {
					searchVue.v_data_show = true;
					searchVue.v_s_show = false;	

					searchVue.rData = d.items;
					console.log(d); 
				}
				else{
					searchVue.v_s_show = true;	
					searchVue.v_tags_show = false;
					searchVue.v_data_show = false;	 
				}
			},'json');
		},
		// 标签操作
		clickTag:function(msg,e){ 
			this.val = msg;
		},
		getFocus:function(){
			this.v_tags_show = true;
			this.v_s_show = false;
			this.v_data_show = false; 
		}
	}
});