<template>
	<section>
		<!-- <div class="wrapper" style="padding-bottom: 64px;"> -->
			<HeadareEl  v-if="$route.fullPath != '/auth'"></HeadareEl>
			<div class="container">
				<router-view></router-view>
			</div>
		<!-- </div> -->


		<Contact></Contact>
	</section>
</template>

<script>

import Vue       from 'vue'
import VueRouter from 'vue-router'
import VTooltip  from 'v-tooltip'
import Main      from './Main.vue'
import Catalog   from './Catalog.vue'
import Order     from './Order.vue'
import Orders    from './Orders.vue'
import Contacts  from './Contacts.vue'
import Cart      from './Cart.vue'
import Auth      from './Auth.vue'
import HeadareEl from './Header.vue'
import Contact   from './components/Contact.vue'
import Store     from '../store/catalog.js'
import $         from 'jquery'
import 'malihu-custom-scrollbar-plugin'
import 'jquery-mousewheel'

Vue.use(VueRouter)
Vue.use(VTooltip)

var router = new VueRouter({
	routes: [
		{ path: '/',          redirect: '/orders' },
		{ path: '/main',      redirect: '/orders' },
		{ path: '/catalog',   component: Catalog },
		{ path: '/order',     component: Order },
		{ path: '/orders',    component: Orders },
		{ path: '/cart',      component: Cart },
		{ path: '/auth',      component: Auth },
	]
})

export default  {
	router: router,
	components: {HeadareEl, Contact},
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
}

</script>


