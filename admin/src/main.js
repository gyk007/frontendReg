import Vue          from 'vue'
Vue.config.productionTip = false;
import VueRouter    from 'vue-router'
import ToggleButton from 'vue-js-toggle-button'

import Catalog    from './views/Catalog.vue'
import Managers   from './views/Managers.vue'
import Orders     from './views/Orders.vue'
import Order      from './views/Order.vue'
import Promotion  from './views/Promotion.vue'
import Client     from './views/Client.vue'
import Statistic  from './views/Statistic.vue'
import moment     from 'moment'
import store      from './store/catalog.js'

import $          from 'jquery'
import 'malihu-custom-scrollbar-plugin'
import 'jquery-mousewheel'


Vue.use(VueRouter)
Vue.use(ToggleButton)


var router = new VueRouter({
	routes: [
		{ path: '/',             redirect: '/catalog' },
		{ path: '/catalog',      component: Catalog },
		{ path: '/orders',       component: Orders },
		{ path: '/order/:id',    component: Order },
		{ path: '/client',       component: Client },
		{ path: '/statistic',    component: Statistic },
		{ path: '/merchants',    component: Managers },
	]
})

new Vue({
	el: '#app',
	router: router,
	store: store,
	computed: {
		netList() {
			return this.$store.getters.netList
		},
	},
	created: function() {
		let minHeight = $(window).outerHeight() - $('.js-footer').outerHeight()
		$('.wrapper').css('min-height', minHeight + 'px')

		// Получаем все товары в кеш, для скорости загрузки
		this.$store.dispatch('getProductListTcCache')

		let $this = this;
		// Загружаем все товары в кеш  через каждый час
		var timerId = setInterval(function() {
			$this.$store.dispatch('getProductListTcCache')
		}, 3600000);
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
		// Згружаем список клиентов в фоне
		if (!this.netList) {
			this.$store.dispatch('getNetList')
		}
	}
})




