<template>
<section>
	<div class="wrapper" style="padding-bottom: 64px;">
		<HeadareEl></HeadareEl>
		<div class="container">
			<router-view></router-view>
		</div>
	</div>

	<div class="footer js-footer">
		<div class="container">
			<div class="footer__left">Московская область, г. Мытищи,<br>ул. Силикатная, владение 55-В</div>
			<div class="footer__right">
				<a href="#" class="footer__logo">
					<img class="footer__logo-img" src="pic/logo-nix.png" alt="logo">
					<span class="footer__logo-txt">Разработано<br>в Nixteam</span>
				</a>
			</div>
		</div>
	</div>
</section>
</template>

<script>

import Vue       from 'vue'
import VueRouter from 'vue-router'
import Main      from './Main.vue'
import Catalog   from './Catalog.vue'
import Orders    from './Orders.vue'
import Contacts  from './Contacts.vue'
import Cart      from './Cart.vue'
import HeadareEl from './Header.vue'
import $         from 'jquery'
import 'malihu-custom-scrollbar-plugin'
import 'jquery-mousewheel'

Vue.use(VueRouter)

var router = new VueRouter({
	routes: [
		{ path: '/main',      component: Main },
		{ path: '/catalog',   component: Catalog },
		{ path: '/orders',    component: Orders },
		{ path: '/contacts',  component: Contacts },
		{ path: '/cart',      component: Cart },
	]
})

export default  {
	router: router,
	components: {HeadareEl},
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


