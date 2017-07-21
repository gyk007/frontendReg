import Vue       from 'vue'
import VueRouter from 'vue-router'
import Main      from './views/Main.vue'
import Catalog   from './views/Catalog.vue'
import Orders    from './views/Orders.vue'
import Promotion from './views/Promotion.vue'
import Contacts  from './views/Contacts.vue'
import Card      from './views/Card.vue'
import $         from 'jquery'
import 'malihu-custom-scrollbar-plugin'
import 'jquery-mousewheel'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    { path: '/main',      component: Main },
    { path: '/catalog',   component: Catalog },
    { path: '/orders',    component: Orders },
    { path: '/promotion', component: Promotion },
    { path: '/contacts',  component: Contacts },
    { path: '/card',      component: Card }
  ]
})

new Vue({
  	el: '#app',
 	router: router,
 	created: function() {
 		let minHeight = $(window).outerHeight() - $('.js-footer').outerHeight()
		$('.wrapper').css('min-height', minHeight + 'px')
	}
})