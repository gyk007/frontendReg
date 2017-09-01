<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
			<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container-shops">
				<div class="modal__hdr">Торговые точки</div>
				<div class="shop_table">
					<div class="b-catalog__table">
					<div class="b-catalog__row js-t-row">
						<div class="b-catalog__cell b-catalog__table-hdr">Название</div>
						<div class="b-catalog__cell b-catalog__table-hdr">Адрес</div>
					</div>

					<div class="b-catalog__row js-t-row" v-for='shop in shopList'>
						<div class="b-catalog__cell b-catalog__table-title">
							<div class="b-catalog__table-title--img"><img src="pic/nologo.png" alt="logo"></div>
							<span>{{shop.official.name}}</span>
						</div>
						<div class="b-catalog__cell b-catalog__table-name">{{shop.official.address}}</div>
					</div>
				</div>
				</div>
				</br>
				<button class="modal_btn btn" v-on:click="close">Закрыть</button>

			</div>
		</div>
		</div>
	</transition>
</template>


<script>
  import store from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
	computed: {
		shopList() {
			return this.$store.getters.shopList;
		},
		showShopsWnd() {
			return this.$store.getters.showShopsWnd;
		},
	},
	methods: {
		close() {
			this.$store.commit('set', {type: 'showShopsWnd', items: false})
		}
	},
	created: function() {
		this.$store.dispatch('getShops')
	}
  }
</script>

