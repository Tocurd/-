import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import Update from './views/Update.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/' , name: 'home' , component: Home },
		{ path: '/admin' , name: 'admin' , component: Admin },
		{ path: '/update' , name: 'update' , component: Update },
	]
})
