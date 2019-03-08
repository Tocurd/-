<template>
	<div class="warpper" :style="{
		overflow : show ? 'hidden' : '',
		height : show ? '100%' : false
	}">
		
		<div class="box">
			<h2>立即参与活动领取赠金大礼包! </h2>
			<p>在五个工作日内完成入金<span>≥1,000</span>美金及以上的客户，即可获得<span>20%</span>赠金奖励，最高达<span>4000</span>美元!</p>
			<img src="../assets/lucky.jpg" class="lucky">
			<h2 class="tow">详情请联系公司客服,以完成礼包兑换,获取优惠! </h2>
			<img src="../assets/wechat.jpg" class="wechat">
		</div>



		<div class="popup" v-show="show">
			<div class="popup-main">
				<div class="close" @click="show = false">
					X
				</div>
				<h3>请填写开户信息</h3>
				<div class="form">
					<input type="text" v-model="name" placeholder="请输入您的姓名">
					<input type="text" v-model="wechat" placeholder="请输入您的微信号">
					<!-- <input type="text" placeholder="请输入您的手机号码"> -->
				</div>
	

				<button v-if="loading" disabled>加载中···</button>
				<button @click="push" v-else>同意授权开户</button>
			</div>
			<div class="popup-shadow"></div>
		</div>

		<div class="fixed-button" @click="submit">
			同意授权开户
		</div>
	</div>
</template>

<style lang="less" scoped>
	.fixed-button{
		position: fixed;
		width: 100%;
		max-width: 750px;
		bottom: 0px;
		left: 0;
		width:(750rem / 74);
		height:(100rem / 74);
		line-height:(100rem / 74);
		font-size: (36rem / 74);
		background:linear-gradient(90deg,rgba(244,148,54,1) 0%,rgba(241,30,38,1) 100%);
		box-shadow:0px -10px 30px 0px rgba(126,28,8,0.3);
		color:#fff;
		text-align: center;
	}
	.warpper{
		max-width: 750px;
		background-origin:content-box;
		position: relative;
		background: url("../assets/bg.jpg") top no-repeat;
		background-color: #fa2f31;
		background-size: 100% auto;
		margin:0 auto;
		overflow: hidden;
		top: 0;
		display: flex;
		flex-direction: column;
		font-size: (28rem / 74);
	
		button{
			outline: none;
		}
		.popup{
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			.popup-shadow{
				position: fixed;
				top: 0;
				width: 100%;
				height: 100%;
				left: 0;
				background-color: rgba(0,0,0,0.7);
			}
			.popup-main{
				.close{
					position: absolute;
					right: 15px;
					font-size: 17px;
					opacity: 0.5;
					top: 15px;
				}
				h3{
					text-align: center;
					font-size: (40rem / 74);
					margin-top: 0;
					font-weight: 400;
					margin-bottom: (68rem / 74);

				}
				.form{
					display: flex;
					flex-direction: column;
					input[type='text']{

						border:1px solid #eee;
						padding: (24rem / 74);
						font-size: (25rem / 74);
						margin-bottom: (14rem / 74);
					}
				}
				width: 92%;
				position: absolute;
				left: 0;
				padding: (60rem / 74);
				padding-bottom: (60rem / 74);
				border-radius: 10px;
				z-index: 1000;
				right: 0;
				top: (200rem / 74);
				/* top: 20%; */
				background-color: #fff;
				margin:0 auto;

				button{
					width: 100%;
					margin-top: 13px;
					height: (80rem / 74);
					border-radius: 5px;
					color:#fff;
					border:none;
					background:linear-gradient(90deg,rgba(244,148,54,1) 0%,rgba(241,30,38,1) 100%);
					// box-shadow:0px -10px 30px 0px rgba(126,28,8,0.3);
				}
			}
		}



		.box{
			background-color: #fff;
			width: 92%;
			margin:0 auto;
			padding: (68rem / 74) (41rem / 74);
			position: relative;
			margin-top: (619rem / 74);
			box-shadow:0px 10px 30px 0px rgba(126,28,8,0.5);
			border-radius:5px;
			margin-bottom: (148rem / 74);
			display: flex;
			flex-direction: column;
			.lucky{
				width: (435rem / 74);
				margin: 0 auto;

			}

			.wechat{
				width: (444rem / 74);
				margin: 0 auto;
				margin-top: (35rem / 74);
			}



			h2{
				margin:0;
				font-size: (30rem / 74);
				color:#1C3F7C;
				text-align: center;
				&.tow{
					font-size: (27rem / 74);
					margin-top: (80rem / 74);
				}
			}
			p{
				color:#1C3F7C;
				font-size: (26rem / 74);
				line-height: (51rem / 74);
				span{
					color:#F6B53E;
					font-size: (32rem / 74);
				}
			}
		}
	}
</style>

<script>
export default {
	name: 'home',
	data(){
		return{
			show : false,
			name : "",
			wechat : "",
			loading : false,
		}
	},
	methods : {
		submit(){
			this.show = true;
		},
		push(){
			if(this.name == "" || this.wechat == "") {
				alert("您输入的姓名或者微信号不能为空");
				return;
			}
			if(this.name.length > 20 || this.wechat.length > 50) {
				alert("您输入的姓名或者微信号太长");
				return;
			}

			let params = { name : this.name , wechat : this.wechat }
			let paramsString = "";
			for(let key in params){
				if(typeof params[key] == "object"){
					params[key] = JSON.stringify(params[key])
				}
				paramsString += `&${key}=${params[key]}`;
			}
			paramsString = paramsString.substr(1 , paramsString.length - 1);



			this.loading = true;
			this.$Axios.post("http://www.goldennz.com/api/v1/push" , paramsString ,{
				headers:{
					"Content-Type" : "application/x-www-form-urlencoded"
				}
			}).then((data) => {
				this.loading = false;

				if(typeof data.data.state == 'undefined'){
					setTimeout(() => {
						alert("服务器出现故障，请稍后再试")
						this.show = false;
					} , 50)
				}else{
					if(data.data.state){
						setTimeout(() => {
							alert("恭喜您获得开户赠金，详情请联系公司客服,以完成礼包兑换,获取优惠! ")
							this.show = false;
						} , 50)
					}else{
						setTimeout(() => {
							alert(data.data.message)
						} , 50)
					}
				}
			} , () => {
				setTimeout(() => {
					alert("服务器出现故障，请稍后再试")
					this.show = false;
				} , 50)
				this.loading = false;
			})

		}
	}
}
</script>
