<template>
	<div class="update">
		<span>当前数量：{{countD}}/110人</span><br><br>
		<input type="text" v-model="count" placeholder="请输入要增加的人数">
		<button v-if="loading">加载中</button>
		<button @click="add" v-else>增加人数</button>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				loading : false,
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
		methods : {

			update(){
				this.$Axios.get("http://www.goldennz.com/api/v1/get").then((data) => {
					this.countD = data.data.message
				})
			},

			add(){
				let params = { count : this.count }
				let paramsString = "";
				for(let key in params){
					if(typeof params[key] == "object"){
						params[key] = JSON.stringify(params[key])
					}
					paramsString += `&${key}=${params[key]}`;
				}
				paramsString = paramsString.substr(1 , paramsString.length - 1);


				this.loading = true;
				this.$Axios.post("http://www.goldennz.com/api/v1/edit_setting" , paramsString ,{
					headers:{
						"Content-Type" : "application/x-www-form-urlencoded"
					}
				}).then((data) => {
					this.loading = false;

					if(typeof data.data.state == 'undefined'){
						alert("服务器出现故障，请稍后再试")
					}else{
						if(data.data.state){
							this.update();
							alert("增加人数成功 ")
						}else{
							alert(data.data.message)
						}
					}
				} , () => {
					this.loading = false;
					alert("服务器出现故障，请稍后再试")
				})
			}
		}
	}
</script>
<style>
	.update{
		padding: 50px;
	}
	input{
		border:1px solid #ddd;
		padding: 10px;

	}
	button{
		padding: 10px;
		border:none;
		color:#fff;
		outline: none;
		cursor: pointer;
		margin-left: 10px;
		width: 100px;
		background:linear-gradient(90deg,rgba(244,148,54,1) 0%,rgba(241,30,38,1) 100%);
	}
</style>