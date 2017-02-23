
var window_with = document.body.offsetWidth;


$.get('/ajax/index',function(d){
	
	new Vue({
		el:"#app",
		data:{
			top:d.items[0].data.data,
			hot:d.items[1].data.data,
			recommend:d.items[2].data.data,
			female:d.items[3].data.data, 
			male:d.items[4].data.data,
			free:d.items[5].data.data, 
			topic:d.items[6].data.data,

			tab_current_on:'tab_current',
			tab_current_off:'',
			position:0,
			duration:0.5,
			h_position:0,
			h_duration:0.5,
			w_width: window_with, 
		},
		methods:{  
			tabSwith:function(item){ console.log(item);  
				if(item == 0){
					this.position = 0; 
					this.h_position = 0;
					this.tab_current_on = 'tab_current';
					this.tab_current_off = '';
				}else{
					this.position = (-window_with);
					this.h_position = 100;
					this.tab_current_on = '';
					this.tab_current_off = 'tab_current'; 
				}
			}
		}
	})
},'json'); 