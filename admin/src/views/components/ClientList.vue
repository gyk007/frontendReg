<template>
	 <div class="b-catalog__container">
		<div class="b-catalog__table">

			<div class="b-catalog__row js-t-row">
				<div class="b-catalog__cell b-catalog__table-hdr">Название</div>
				<div class="b-catalog__cell b-catalog__table-hdr">Имя представителя</div>
				<div class="b-catalog__cell b-catalog__table-hdr">Телефон</div>
				<div class="b-catalog__cell b-catalog__table-hdr">ИНН</div>
				<div class="b-catalog__cell b-catalog__table-hdr"></div>
			</div>

			<div class="b-catalog__row js-t-row" v-for='client in clientsList' v-on:click="selectClient(client)">
				<div class="b-catalog__cell b-catalog__table-name">
					<div class="b-catalog__table-title--img"><img src="pic/nologo.png" alt="logo"></div>
					<span>{{client.official.name}}</span>
				</div>
				<div class="b-catalog__cell b-catalog__table-title">{{client.official.person}}</div>
				<div class="b-catalog__cell b-catalog__table-history">{{client.official.phone}}</div>
				<div class="b-catalog__cell b-catalog__table-history">{{client.official.taxcode}}</div>
				<div class="b-catalog__cell b-catalog__table-history"><a data-fancybox  data-src="#popup__client" href="javascript:;" class="btn btn--edit">Просмотр</a></div>
			</div>
		</div>
		<!-- Лоадер -->
		<div class='product_loader' v-if='loader'><img src="pic/loading.gif"></div>
	</div>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'

	export default {
		computed: {
			clientsList() {
				if (this.$store.getters.searchClient) {
					return this.$store.getters.searchClient
				} else {
					return this.$store.getters.clientsList
				}
			},
			idActive() {
				return this.$store.getters.idActive
			},
			loader() {
				return this.$store.getters.loader
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
	}
</script>