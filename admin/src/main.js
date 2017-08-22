import Vue       from 'vue'
import VueRouter from 'vue-router'
import Catalog   from './views/Catalog.vue'
import Orders    from './views/Orders.vue'
import Order     from './views/Order.vue'
import Promotion from './views/Promotion.vue'
import Client    from './views/Client.vue'
import $         from 'jquery'
import 'malihu-custom-scrollbar-plugin'
import 'jquery-mousewheel'

Vue.use(VueRouter)

var router = new VueRouter({
	routes: [
		{ path: '/',          redirect: '/catalog' },
		{ path: '/catalog',   component: Catalog },
		{ path: '/orders',    component: Orders },
		{ path: '/order',     component: Order },
		// { path: '/promotion', component: Promotion },
		{ path: '/client',    component: Client }
	]
})

new Vue({
	el: '#app',
	router: router,
	created: function() {
		let minHeight = $(window).outerHeight() - $('.js-footer').outerHeight()
		$('.wrapper').css('min-height', minHeight + 'px')
	},
	mounted: function() {
		if ($('.js-nav-button').length) {
			$('.js-nav-button').click(function () {
				$(this).find('.tcon').addClass('tcon-transform');
				$('.js-nav').fadeIn(200);
			});
			$('.js-nav-button-close').click(function(){
				$('.tcon').removeClass('tcon-transform');
				$('.js-nav').fadeOut(200);
			})
			$('.js-nav a').click(function(){
				$('.tcon').removeClass('tcon-transform');
				$('.js-nav').fadeOut(200);
			})
		}
		if ($('.js-notification').length) {
			$('.js-notification').click(function () {
				$(this).find('.header__drop').fadeIn(200);
				$('#layer').show();
			});
			$('#layer').click(function () {
				$(this).hide();
				$('.header__drop').fadeOut(200);
			});
		}
	}
})




