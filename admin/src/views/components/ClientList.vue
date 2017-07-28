<template>
	 <div class="b-catalog__container">
		<div class="b-catalog__table">

			<div class="b-catalog__row js-t-row">
				<div class="b-catalog__cell b-catalog__table-hdr">Название</div>
				<div class="b-catalog__cell b-catalog__table-hdr">Имя представителя</div>
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
			</div>

		</div>

	</div>
</div>
</template>

<script>
	import store from '../../store/catalog.js'
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