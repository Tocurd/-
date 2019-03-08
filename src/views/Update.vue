<template>
	<div class="update">
		<span>当前数量：{{countD}}/110人</span><br><br>
		<button v-if="loading">加载中</button>

		<button @click="add" v-else>增加人数（人数增加一个）</button>
		<br><br>
		<!-- <button @click="start">开始活动</button>
		<button @click="stop">停止活动</button> -->
		<button @click="clearData">清空数据</button>
		<button @click="importData">导出数据</button>

		<div class="notice" v-show="noticeShow">
			{{notice}}
		</div>
	</div>
</template>
<script>
	
	export default{
		data(){
			return{
				loading : false,
				noticeShow : false,
				notice : "",
				count : "",
				countD : "···",
				intervalId : 0,

			}
		},
		created(){
			this.update();
			this.intervalId = setInterval(this.update , 3000);
		},
		beforeDestroy(){
			clearInterval(this.intervalId);
		},
		watch : {
			noticeShow(){
				if(this.noticeShow == true){
					setTimeout(() => {
						this.noticeShow = false
					} , 1000)
				}
			}
		},
		methods : {
			clearData(){
				if(confirm("清空数据前请务必将数据导出，否则数据将会被全部删除")){
					this.ajax("http://www.goldennz.com/api/v1/clearData" , () => {
						this.update();
					})
				}
			},

			update(){
				this.$Axios.get("http://www.goldennz.com/api/v1/get").then((data) => {
					this.countD = data.data.message
				})
			},

			start(){
				this.ajax("http://www.goldennz.com/api/v1/start")
			},
			stop(){
				this.ajax("http://www.goldennz.com/api/v1/stop")
			},
			importData(){
				window.open("http://www.goldennz.com/api/v1/importData")
			},

			ajax(url , success = () => {}){
				this.$Axios.post(url , "" ,{
					headers:{
						"Content-Type" : "application/x-www-form-urlencoded"
					}
				}).then((data) => {
					this.loading = false;

					if(typeof data.data.state == 'undefined'){
						this.noticeShow = true;
						this.notice = "服务器出现故障，请稍后再试";
					}else{
						if(data.data.state){
							success();
							this.noticeShow = true;
							this.notice = "操作成功";
						}else{
							this.noticeShow = true;
							this.notice = data.data.message;
						}
					}
				} , () => {
					this.loading = false;
					this.noticeShow = true;
					this.notice = "服务器出现故障，请稍后再试";
				})
			},

			add(){
				this.ajax("http://www.goldennz.com/api/v1/add" , () => {
					this.update();
				})
				
			}
		}
	}
</script>
<style>
	.update{
		padding: 50px;
	}
	.notice{
		padding: 10px;
		margin-left: 10px;
		background-color: #000;
		color:#fff;
		width: 250px;
		position: relative;
		top: 40px;
		border-radius: 4px;
		text-align: center;
		margin-bottom: 10px;
	}
	input{
		border:1px solid #ddd;
		padding: 10px;

	}
	button{
		padding: 10px 30px;
		border:none;
		color:#fff;
		outline: none;
		cursor: pointer;
		margin-left: 10px;
		background:linear-gradient(90deg,rgba(244,148,54,1) 0%,rgba(241,30,38,1) 100%);
	}
</style>