<template>
   <section class="header">
		<div class="container">
			<div class="nav__button js-nav-button">
					<button type="button" class="tcon tcon-menu--xbutterfly" aria-label="toggle menu">
							<span class="tcon-menu__lines" aria-hidden="true"></span>
							<span class="tcon-visuallyhidden">toggle menu</span>
					</button>
			</div>

			<a href="#" class="header__logo">
				<img src="pic/logo.png" alt="logo">
			</a>

			<nav class="nav js-nav">
				<div class="js-nav-button-close">X</div>
				<ul class="nav__list">
					<li><router-link to="/orders"  active-class='active'>Заказы</router-link></li>
					<li><router-link to="/catalog" active-class='active'>Каталог</router-link></li>
					<li><a data-fancybox data-src="#popup__contact" href="javascript:;">Обратная связь</a></li>
					<li><a data-fancybox data-src="#popup__exit"    href="javascript:;">Выход</a></li>
					<li><div @click='show'>Тест</div></li>
				</ul>
			</nav>

			<router-link to="/cart">
			<div class="header__basket">
					<div class="header__basket-stat">
							<svg><use xlink:href="#bag"></use></svg>
							<div class="header__basket-num">{{cartPrice}}&nbsp;<i class="rub">a</i></div>
					</div>
			</div>
			</router-link>

			<div class="header__user">
					<div class="header__user--holder">

							<div class="header__user-container">
									<div class="header__user-name" v-if='shop'>
										<a data-fancybox data-src="#popup__select_shop" href="javascript:;">{{shop.official.name}}</a>
									</div>
									<div class="header__user-logo">
											<!-- <img src="pic/icon/name-logo.png" alt="logo"> -->
											<span v-if='user'>{{user.name}}</span>
									</div>
							</div>

					</div>
			</div>
		</div>

	</section>
</template>


<script>
	import Store   from '../store/catalog.js'
	import $       from 'jquery'

	export default {
		store: Store,
		computed: {
			cartPrice() {
				return this.$store.getters.cartPrice
			},
			user() {
				return this.$store.getters.user
			},
			shop() {
				return this.$store.getters.shop
			}
		},
		methods: {
			show() {
				this.$store.commit('set', {type: 'showModal', items: true})
			},
		},
		beforeCreate: function() {
			this.$store.dispatch('getUser')
			this.$store.dispatch('getCart')
		}
	}
</script>
