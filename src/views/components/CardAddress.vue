<template>
	<section class="p-card__data">
		<div class="p-card__data-title">Ваши данные</div>

		<form action="#" class="p-card__data-form">
			<div class="input-field">
				<input id="personal-card-company-name" type="text" class="input" value="Азбука Вкуса">
				<label for="personal-card-company-name">Название компании</label>
			</div>
			<div class="input-field">
				<input id="personal-card-tel" type="text" class="input" value="+7 (497) 468-89-78">
				<label for="personal-card-tel">Телефон получателя<span class="accent">*</span></label>
			</div>
			<div class="input-field">
				<input id="personal-card-addr" type="text" class="input" value="г. Москва, ул. Силикатная, владение 55-B">
				<label for="personal-card-addr">Адрес доставки<span class="accent">*</span></label>
			</div>
			<div class="input-field">
				<input id="personal-card-name" type="text" class="input" value="Иванович Сергей Михайлович">
				<label for="personal-card-name">Имя получателя<span class="accent">*</span></label>
			</div>
			<div class="input-field">
				<input id="personal-card-email" type="email" class="input" value="product@azbuka.com">
				<label for="personal-card-email">Эл.почта<span class="accent">*</span></label>
			</div>

			<div class="p-card__data-form--txt">
				<span>Пожелания по доставке</span>
				<textarea name="personal-card-message">Доставить на третий склад</textarea>
			</div>

			<button type="submit" class="btn btn--checkout p-card__data-submit">Оформить</button>

		</form>

	</section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'

	export default {
		computed: {
			catalogTree() {
					return this.$store.getters.catalogTree
				},
				idActive() {
					return this.$store.getters.idActive
				}
		},
		methods: {
			getProductList(category) {
				this.$store.dispatch('getProductList', category.id)
				this.$store.dispatch('selectCategory', category)
				$('.jq-scroll').mCustomScrollbar();
			},
			showSubCategory(){
				let btn = $(event.target);
				btn.next('.catalog__nav-sub')
					.slideToggle(200, function () {
						btn.toggleClass('active')
				});
			}
		},
		created: function() {
		}
	}
</script>