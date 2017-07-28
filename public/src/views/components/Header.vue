<template>
    <div class="hero">
	<header class="header ">
	<div class="container">
		<div class="header__row">
			<div class="header__row-item header__nav">
				<div class="nav__button js-nav-button">
					<button type="button" class="tcon tcon-menu--xbutterfly" aria-label="toggle menu">
						<span class="tcon-menu__lines" aria-hidden="true"></span>
						<span class="tcon-visuallyhidden">toggle menu</span>
					</button>
				</div>
	<nav class="nav js-nav">
	<div class="js-nav-button-close">X</div>
	<ul class="nav__list">
		<li><router-link to="/catalog"   active-class="black">Каталог</router-link></li>
		<li><router-link to="/news"      active-class="black">Новости</router-link></li>
		<li><router-link to="/promotion" active-class="black">Акции</router-link></li>
		<li><router-link to="/articles"  active-class="black">Статьи</router-link></li>
	</ul>
	</nav>

			</div>
			<div class="header__row-item header__logo">
				<a href="#" class="header__logo-img"><img src="pic/logo.png" alt="logo"></a>
			</div>
			<div class="header__row-item header__enter">
				<a href="#" class="btn">Войти</a>
			</div>
		</div>
	</div>
</header>
	  <div class="hero__container">
		<div class="hero__container--holder">
			<div class="container">
				<h1 class="hero__hdr">Удобное управление<br> логистикой и закупками</h1>
				<div class="hero__sub">
					Как известно, RxJava идеально подходит для решения двух задач: обработки
					потоков событий и работы с асинхронными методами.
				</div>
				<div class="hero__btn">
					<a href="#" class="btn">Зарегистрироваться</a>
				</div>
				<div class="hero__link">
					<a href="#">У меня уже есть аккаунт</a>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>


<script>
  import store  from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
	computed: {
		client() {
			return this.$store.client
				? this.$store.getters.client
				:  null
		},
	},
	methods: {
		addCategory() {
			this.$store.dispatch('addCategory', this.category)
			this.$store.dispatch('selectCategory', null)
			$('.js-catalog-category a').removeClass('active')
			$.fancybox.close()
		},
		editCategory() {
			this.$store.dispatch('editCategory', this.category)
			this.$store.dispatch('selectCategory', null)
			$('.js-catalog-category a').removeClass('active')
			$.fancybox.close()
		}
	},
  }
</script>
