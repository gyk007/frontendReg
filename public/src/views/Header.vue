<template>
   <section class="header">

			<div class="nav__button js-nav-button">
					<button type="button" class="tcon tcon-menu--xbutterfly" aria-label="toggle menu">
							<span class="tcon-menu__lines" aria-hidden="true"></span>
							<span class="tcon-visuallyhidden">toggle menu</span>
					</button>
			</div>

			<a href="#" class="header__logo">
				<img src="pic/JTLogistic.svg" alt="logo">
			</a>

			<nav class="nav js-nav">
				<div class="js-nav-button-close">X</div>
				<ul class="nav__list">
					<li><router-link to="/orders"  active-class='active'>Заказы</router-link></li>
					<li><router-link to="/catalog" active-class='active'>Каталог</router-link></li>
					<li><a style="cursor:pointer" @click='showContactWnd'>Обратная связь</a></li>
					<li><a style="cursor:pointer" @click='showFiles'>Декларации</a></li>
					<li><a data-fancybox data-src="#popup__exit"    href="javascript:;">Выход</a></li>
				</ul>
			</nav>

			<router-link to="/cart" v-if='cartPrice'>
			<div class="header__basket">
					<div class="header__basket-stat">
							<svg><use xlink:href="#bag"></use></svg>
							<div class="header__basket-num">{{cartPrice.toLocaleString('ru-RU')}}&nbsp;<i class="rub">a</i></div>
					</div>
			</div>
			</router-link>

			<div class="header__basket" v-if='!cartPrice'>
					<div class="header__basket-stat">
							<svg><use xlink:href="#bag"></use></svg>
							<div class="header__basket-num">{{cartPrice}}&nbsp;<i class="rub">a</i></div>
					</div>
			</div>


			<div  v-if='shop'
				class="header__user"
				v-tooltip.bottom-left = " 'АДРЕС: '  + shop.official.address">
					<div class="header__user--holder">

							<div class="header__user-container">
									<div class="header__user-name"  v-if='shop && shop.net' >
										<div class='link'   @click='showSelectShopWnd'>{{shop.net.net_name}} : {{shop.official.name}}</div>
									</div>
									<div class="header__user-logo">
											<!-- <img src="pic/icon/name-logo.png" alt="logo"> -->
											<span v-if='user'>{{user.name}}</span>
									</div>
							</div>

					</div>
			</div>

			<div class='info_block'>
				<span v-if='shop && shop.net'>ИНН: {{shop.net.official.taxcode}}</span>
				<span v-if='shop && shop.official' style='padding-left:10px'>КПП: {{shop.official.taxreasoncode}} </span>
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
			showSelectShopWnd() {
				this.$store.commit('set', {type: 'selectShopWnd', items: true})
			},
			showContactWnd() {
				this.$store.commit('set', {type: 'contactWnd', items: true})
			},
			showFiles(){
				this.$store.commit('set', {type: 'showFilesWnd', items: true})
			}
		},
		beforeCreate: function() {
			this.$store.dispatch('getUser')
			this.$store.dispatch('getCart')

			// Получаем все товары в кеш, для скорости загрузки
			this.$store.dispatch('getProductListTcCache')

			let $this = this;
			// Загружаем все товары в кеш  через каждый час
			var timerId = setInterval(function() {
				$this.$store.dispatch('getProductListTcCache')
			}, 3600000);
		}
	}
</script>
