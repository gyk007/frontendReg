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
					<li><router-link to="/main" active-class="black">Главная</router-link></li>
					<li><router-link to="/catalog">Каталог продукции</router-link></li>
					<li><router-link to="/orders">Заказы</router-link></li>
					<li><router-link to="/contacts">Обратная связь</router-link></li>
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
							<div class="header__user-bell active js-notification">
									<svg><use xlink:href="#bell"></use></svg>
									<div class="header__drop jq-scroll">
											<div class="header__drop-row">
													<span class="status status--delivered">Новое</span>
													<span class="header__drop-txt">Вы получили скидку в 15%</span>
											</div>
											<div class="header__drop-row">
													<span class="status status--delivered">Новое</span>
													<span class="header__drop-txt">Ваш заказ готовится к отправке</span>
											</div>

											<div class="header__drop-row">
													<span class="header__drop-txt">Добавлена возможность покупки</span>
											</div>
											<div class="header__drop-row">
													<span class="header__drop-txt">Добавлена сопроводительная документация на продукцию: Вино ARLINE 742<br>
															<a href="#" class="header__drop-txt--link">Скачать PDF</a>

													</span>
											</div>
											<div class="header__drop-row">
													<span class="header__drop-txt"><a href="#" class="header__drop-txt--link-more">Все уведомления</a></span>
											</div>
									</div>
							</div>
							<div class="header__user-container">
									<div class="header__user-name">
											<span>Олег Владимирович</span>
											<div class="header__user-name--btn">&gt;</div>
									</div>
									<div class="header__user-logo">
											<img src="pic/icon/name-logo.png" alt="logo">
											<span>Азбука Вкуса</span>
									</div>
							</div>

					</div>
			</div>
		</div>
	</section>
</template>


<script>
  import Store  from '../store/catalog.js'
  import $      from 'jquery'

  export default {
  	store: Store,
	computed: {
		cartPrice() {
			return this.$store.getters.cartPrice
		},
	},
	methods: {

	},
	created: function() {
		this.$store.dispatch('getCart')
	}
  }
</script>
