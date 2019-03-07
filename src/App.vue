<template>
	<div id="app">
		<router-view/>
	</div>
</template>
<style>
	@import "./assets/less/normalize.less"
</style>
<script>
	export default{
		mounted(){
			var htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
			var htmlDom = document.getElementsByTagName("html")[0];
			if(htmlWidth > 750) htmlWidth = 750;
			htmlDom.style.fontSize = htmlWidth / 10 + "px";
			window.addEventListener("resize", function () {
				var htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
				if(htmlWidth > 750) htmlWidth = 750;
				htmlDom.style.fontSize = htmlWidth / 10 + "px";
			});    
		}
	}
</script>