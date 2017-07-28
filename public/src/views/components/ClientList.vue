<template>
	 <div class="b-catalog__container">
		<div class="b-catalog__table">

			<div class="b-catalog__row js-t-row">
				<div class="b-catalog__cell b-catalog__table-hdr">Название</div>
				<div class="b-catalog__cell b-catalog__table-hdr">Имя представителя</div>
				<div class="b-catalog__cell b-catalog__table-hdr">&nbsp;</div>
				<div class="b-catalog__cell b-catalog__table-hdr">&nbsp;</div>
				<div class="b-catalog__cell b-catalog__table-hdr">&nbsp;</div>
				<div class="b-catalog__cell b-catalog__table-hdr">&nbsp;</div>
			</div>

			<div class="b-catalog__row js-t-row" v-for='client in clientsList' v-on:click="selectClient(client)">
				<div class="b-catalog__cell b-catalog__table-title">
					<div class="b-catalog__table-title--img"><img src="pic/icon/name-logo.png" alt="logo"></div>
					<span>{{client.name}}</span>
				</div>
				<div class="b-catalog__cell b-catalog__table-name"><a href="#">{{client.person}}</a></div>
				<div class="b-catalog__cell b-catalog__table-history"><a href="#">История заказов</a></div>
				<div class="b-catalog__cell b-catalog__table-stat"><a href="#">Статистика</a></div>
				<div class="b-catalog__cell b-catalog__table-doc"><a href="#">Документы</a></div>
				<div class="b-catalog__cell b-catalog__table-control">
					<span class="js-catalog-control">Управление магазином</span>
					<ul class="a-catalog__item-drop">
						<li><a data-fancybox data-src="#discount-00" href="javascript:;">Назначить скидку</a></li>
						<li><a href="#">Написать уведомление</a></li>
						<li><a data-fancybox data-src="#forbidden-00" href="javascript:;">Запрет покупки продукции</a></li>
					</ul>
					<div style="display: none;" id="forbidden-00" class="a-catalog__forbid">
						<div class="a-catalog__forbid-hdr">Управление товарами</div>
						<div class="a-catalog__forbid-search">
							<form action="#" class="search">
								<input type="text" class="input search__input" placeholder="Введите название, артикул">
								<input type="submit" class="search__submit" value="">
								<div class="search__icon">
									<svg>
										<use xlink:href="#glass"></use>
									</svg>
								</div>
							</form>
						</div>
						<ul class="a-catalog__forbid-list">
							<li class="active js-t-row">
								<div class="a-catalog__forbid-img">
									<a href="#"><img src="pic/products/abrau_brut.png" alt="product"></a>
								</div>
								<div class="a-catalog__forbid-txt"><a href="#" class="hovered">KRIM Valley Полусладкое белое</a></div>
								<div class="a-catalog__forbid-btn">
									<button class="btn btn--pickup">Запретить к покупке</button>
								</div>
							</li>
							<li class="unactive js-t-row">
								<div class="a-catalog__forbid-img">
									<a href="#"><img src="pic/products/ararat3.png" alt="product"></a>
								</div>
								<div class="a-catalog__forbid-txt"><a href="#" class="hovered">Вдова Клико Понсардин Розе подарочная упаковка</a></div>
								<div class="a-catalog__forbid-btn">
									<button class="btn btn--pickup">Запретить к покупке</button>
								</div>
							</li>
							<li class="js-t-row">
								<div class="a-catalog__forbid-img">
									<a href="#"><img src="pic/products/ararat_otbor.png" alt="product"></a>
								</div>
								<div class="a-catalog__forbid-txt"><a href="#" class="hovered">Авторское вино Каберне-Саперави<br> Фанагории, красное сухое</a></div>
								<div class="a-catalog__forbid-btn">
									<button class="btn btn--ok">Запрещено</button>
								</div>
							</li>
							<li class="js-t-row">
								<div class="a-catalog__forbid-img">
									<a href="#"><img src="pic/products/ararat_otbor.png" alt="product"></a>
								</div>
								<div class="a-catalog__forbid-txt"><a href="#" class="hovered">KRIM Valley Мускат<br> белое полусухое</a></div>
								<div class="a-catalog__forbid-btn">
									<button class="btn btn--pickup">Запретить к покупке</button>
								</div>
							</li>
							<li class="js-t-row">
								<div class="a-catalog__forbid-img">
									<a href="#"><img src="pic/products/abrau_brut.png" alt="product"></a>
								</div>
								<div class="a-catalog__forbid-txt"><a href="#" class="hovered">KRIM Valley Полусладкое белое</a></div>
								<div class="a-catalog__forbid-btn">
									<button class="btn btn--pickup">Запретить к покупке</button>
								</div>
							</li>
							<li class="unactive js-t-row">
								<div class="a-catalog__forbid-img">
									<a href="#"><img src="pic/products/ararat3.png" alt="product"></a>
								</div>
								<div class="a-catalog__forbid-txt"><a href="#" class="hovered">Вдова Клико Понсардин Розе подарочная упаковка</a></div>
								<div class="a-catalog__forbid-btn">
									<button class="btn btn--pickup">Запретить к покупке</button>
								</div>
							</li>
							<li class="js-t-row">
								<div class="a-catalog__forbid-img">
									<a href="#"><img src="pic/products/ararat_otbor.png" alt="product"></a>
								</div>
								<div class="a-catalog__forbid-txt"><a href="#" class="hovered">Авторское вино Каберне-Саперави<br> Фанагории, красное сухое</a></div>
								<div class="a-catalog__forbid-btn">
									<button class="btn btn--ok">Запрещено</button>
								</div>
							</li>
							<li>
								<div class="a-catalog__forbid-img">
									<a href="#"><img src="pic/products/avtor_fanagoria_aligote.png" alt="product"></a>
								</div>
								<div class="a-catalog__forbid-txt"><a href="#" class="hovered">KRIM Valley Мускат<br> белое полусухое</a></div>
								<div class="a-catalog__forbid-btn">
									<button class="btn btn--pickup">Запретить к покупке</button>
								</div>
							</li>
						</ul>
					</div>
					<div style="display: none;" class="a-catalog__discount" id="discount-00">
						<div class="a-catalog__discount-hdr">Акции</div>
						<ul class="a-catalog__discount-list">
							<li class="js-t-row">
								<div class="a-catalog__discount-list--txt">Скидка 15% на новый товар
									<span class="status status--stopped">-15%</span></div>
								<div class="a-catalog__discount-list--btn">
									<button class="btn btn--pickup">Подключить</button>
								</div>
							</li>
							<li class="js-t-row">
								<div class="a-catalog__discount-list--txt">Скидка 5% на доставку</div>
								<div class="a-catalog__discount-list--btn">
									<button class="btn btn--pickup">Подключить</button>
								</div>
							</li>
							<li class="js-t-row">
								<div class="a-catalog__discount-list--txt">Бесплатная доставка
									<span class="status status--delivering">Специальные условия</span></div>
								<div class="a-catalog__discount-list--btn">
									<button class="btn btn--pickup">Подключить</button>
								</div>
							</li>
							<li class="js-t-row">
								<div class="a-catalog__discount-list--txt">Скидка 7% на новый товар
									<span class="status status--stopped">-7%</span></div>
								<div class="a-catalog__discount-list--btn">
									<button class="btn btn--ok">Подключено</button>
								</div>
							</li>
							<li class="js-t-row">
								<div class="a-catalog__discount-list--txt">Скидка 50% на доставку</div>
								<div class="a-catalog__discount-list--btn">
									<button class="btn btn--pickup">Подключить</button>
								</div>
							</li>
						</ul>
					</div>
				</div>

			</div>

		</div>

	</div>
</div>
</template>

<script>
	import store from '../../store/client.js'
	import $     from 'jquery'

	export default {
		computed: {
			clientsList() {
				return this.$store.getters.clientsList
			},
			idActive() {
				return this.$store.getters.idActive
			}
		},
		methods: {
			selectClient(client) {
				$(event.target).closest('.js-t-row')
					.addClass('active')
					.siblings()
					.removeClass('active')
				this.$store.dispatch('selectClient', client)
			},
		},
		created: function() {
			this.$store.dispatch('getClientList')
		}
	}
</script>