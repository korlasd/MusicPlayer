var app=new Vue({
	el:"#player",
	data:{
		query:"",
		musicList:[],
		musicUrl:"",
		musicCover:"images/cover.png",
		hotComments:[],
		isPlay:false,
		isShow:false,
		mvUrl:""
	},
	methods:{
		// 音乐搜索
		serachMusic:function(){
			var that=this
			axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(function(response){
				 that.musicList = response.data.result.songs;
			})
		},
		// 音乐播放
		playMusic:function(musicId){
			var that=this;
			// 歌曲播放
			axios.get("https://autumnfish.cn/song/url?id="+musicId).then(function(response){
				that.musicUrl=response.data.data[0].url;
			})
			// 歌曲封面
			axios.get("https://autumnfish.cn/song/detail?ids="+musicId).then(function(response){
				that.musicCover=response.data.songs[0].al.picUrl;
			})
			//歌曲评论
			axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId).then(function(response){
				
				that.hotComments=response.data.hotComments;
				
			},function(err){})
		},
		// 播放动画
		play:function(){
			this.isPlay=true;
		},
		pause:function(){
			this.isPlay=false;
		},
		// 播放视频
		playMV:function(mvid){
      var that = this;
      axios.get("https://autumnfish.cn/mv/url?id="+mvid).then(
        function(response) {
          console.log(response.data.data.url);
          that.isShow = true;
          that.mvUrl = response.data.data.url;
        },
        function(err) {}
      );
    },
	hide:function(){
		this.isShow=false;
	}
	
	}
	
})