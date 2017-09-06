<template>
	<section>
		<!-- <div class="wrapper" style="padding-bottom: 64px;"> -->
			<HeadareEl  v-if="showHeader"></HeadareEl>
			<div class="container">
				<router-view></router-view>
			</div>
		<!-- </div> -->


		<Contact v-if='contactWnd'></Contact>
		<ExitWnd></ExitWnd>
		<SelectShopWnd v-if='selectShopWnd'></SelectShopWnd>

	</section>
</template>

<script>

import Vue           from 'vue'
import VueRouter     from 'vue-router'
import VTooltip      from 'v-tooltip'
import ToggleButton  from 'vue-js-toggle-button'
import Main          from './Main.vue'
import Catalog       from './Catalog.vue'
import Order         from './Order.vue'
import Orders        from './Orders.vue'
import Cart          from './Cart.vue'
import Auth          from './Auth.vue'
import HeadareEl     from './Header.vue'
import Registration  from './Registration.vue'
import SelectShopWnd from './components/SelectShopWnd.vue'
import SelectShop    from './SelectShop.vue'
import Contact       from './components/Contact.vue'
import ExitWnd       from './components/ExitWnd.vue'
import Store         from '../store/catalog.js'
import $             from 'jquery'

import 'malihu-custom-scrollbar-plugin'
import 'jquery-mousewheel'

Vue.use(VueRouter)
Vue.use(VTooltip)
Vue.use(ToggleButton)

var router = new VueRouter({
	routes: [
		{ path: '/',                    redirect: '/orders' },
		{ path: '/main',                redirect: '/orders' },
		{ path: '/catalog',             component: Catalog },
		{ path: '/order/:id',           component: Order },
		{ path: '/orders',              component: Orders },
		{ path: '/cart',                component: Cart },
		{ path: '/auth',                component: Auth },
		{ path: '/select_shop',         component: SelectShop },
		{ path: '/registration/:token', component: Registration }

	]
})

export default  {
	router: router,
	store: Store,
	components: {HeadareEl, Contact, ExitWnd, SelectShopWnd},
	computed: {
		contactWnd() {
			return this.$store.getters.contactWnd
		},
		selectShopWnd() {
			return this.$store.getters.selectShopWnd
		},
		shop() {
			return this.$store.getters.shop
		},
		showHeader() {
			let showHeader = true;
			switch (this.$route.matched[0].path) {
			case '/auth':
				showHeader = false;
				break;
			case '/registration/:token':
				showHeader = false;
				break;
			case '/select_shop':
				showHeader = this.shop ? true :false;
				break;
			default:
				showHeader = true;
			}

			return showHeader;
		}
	},
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


