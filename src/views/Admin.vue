<template>
	<div class="admin">
		<h2>客户答谢尊享赠金</h2>
		<div class="box">
			<h3>{{Math.round((countD/110) * 100)}}<span>%</span></h3>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				countD : 0,
				intervalId : -1,
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
		}
	}
</script>
<style lang="less">
	.admin{
		@font-face {
			font-family: "Digital";
			src: url('../assets/Digital.ttf');
		}
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background-color:#f83138;
		h2{
			text-align: center;
			font-size: 87px;
			font-weight: 400;
			color:#fff;
		}
		.box{
			width: 350px;
			height: 350px;
			border-radius: 100%;
			background-color: #fff;
			line-height: 350px;
			position: absolute;
			top:0;
			left: 0;
			right: 0;
			bottom: 0;
			margin:auto;
		}
		h3{
			font-family: "Digital";
			font-size: 197px;
			margin:0;
			color:#f83138;
			text-align: center;
			span{
				font-size: 90px;
			}
		}
	}
</style>