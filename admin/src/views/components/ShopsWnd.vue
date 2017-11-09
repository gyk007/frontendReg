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
						<div class="b-catalog__cell b-catalog__table-hdr">КПП</div>
						<div class="b-catalog__cell b-catalog__table-hdr">Менеджер</div>
						<div class="b-catalog__cell b-catalog__table-hdr"></div>
					</div>

					<div class="b-catalog__row js-t-row"
						v-for='shop in shopList'
						v-on:click="selectShop(shop)"
						:class="{ active : (shop.id == idSelectedShop) }">
						<div class="b-catalog__cell b-catalog__table-history"  style ='width: 20%'>{{shop.official.name}}</div>
						<div class="b-catalog__cell b-catalog__table-history"  style ='width: 25%'>{{shop.official.address}}</div>
						<div class="b-catalog__cell b-catalog__table-history"  style ='width: 5%'>
							<spam v-if='shop.official.taxreasoncode'>{{shop.official.taxreasoncode}}</spam>
							<spam v-else>-</spam>
						</div>
						<div class="b-catalog__cell b-catalog__table-history"  style ='width: 5%'>
							<spam v-if='shop.merchant.name'>{{shop.merchant.name}}</spam>
							<spam v-else>-</spam>
						</div>
						<div class="b-catalog__cell b-catalog__table-history"  style ='width: 5%'>
							<button
								v-if  ='idSelectedShop == shop.id && shop.merchant.name'
								class ="btn btn--edit"
								style ='width:80px; background-color: #f48c42; color: #fff; margin-left: 15px; font-size: 13px'
								@click="deleteMerchant">Удалить</button>
						</div>
						<div class="b-catalog__cell b-catalog__table-history"  style ='width: 5%'>
							<button
								v-if  ='idSelectedShop == shop.id'
								class ="btn btn--edit"
								style ='width:130px; background-color: #00acc1; color: #fff; margin-left: 15px; font-size: 13px'
								@click="merchantWnd">Представитель</button>
						</div>
					</div>
				</div>
				</div>
				</br>
				<button class="modal_btn btn" style='background-color: #f48c42;' v-on:click="close">Закрыть</button>

			</div>
		</div>
		</div>
	</transition>
</template>


<script>
  import store  from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
	computed: {
		shopList() {
			return this.$store.getters.shopList;
		},
		showShopsWnd() {
			return this.$store.getters.showShopsWnd;
		},
		idSelectedShop() {
			if (this.$store.getters.shop){
				return this.$store.getters.shop.id
			} else {
				return undefined
			}
		},
	},
	methods: {
		close() {
			this.$store.commit('set', {type: 'showShopsWnd', items: false})
			this.$store.commit('set', {type: 'shop', items: undefined})
		},
		merchantWnd(){
			this.$store.commit('set', {type: 'showMerchantWnd', items: true})
		},
		selectShop(shop) {
			this.$store.commit('set', {type: 'shop', items: shop})
		},
		deleteMerchant(){
			this.$store.commit('set', {type: 'showDeleteMerchanttWnd', items: true})
		}
	},
	created: function() {
		this.$store.dispatch('getShops')
		this.$store.commit('set', {type: 'shop', items: undefined})
	},
	mounted: function() {
		// По нажатию кнопки ESC закрываем окно,
		// выполняем метод close()
		let	$this = this;
		document.onkeyup = function (e) {
			e = e || window.event;
			if (e.keyCode === 27) {
				$this.close();
			}
			return false;
		}
	},
  }
</script>

