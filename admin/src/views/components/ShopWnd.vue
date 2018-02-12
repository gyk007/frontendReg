<!--
	Компонет магазин, окно показывает данные магазина.
-->
<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
			<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container-net">

				<div class="popup__category" id="popup__client" v-if="shop &&  shop.shop_name">

				<div class="popup__hdr" v-if="!shop"></div>
				<div class="popup__hdr" v-if="shop.shop_name">{{shop.shop_name}}</div>

				<div class="popup__category-form client_form">

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">Название</span>
						<input v-model="shop.shop_name" class="input" readonly="readonly">
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">Имя представителя</span>
						<input v-model="shop.shop_person" class="input" readonly="readonly">
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">Телефон</span>
						<input v-model="shop.shop_phone" class="input" readonly="readonly">
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">E-mail</span>
						<input v-model="shop.shop_email"class="input" readonly="readonly">
					</label>
					</div>

					<div class="popup__product-form--holder client_holder" readonly="readonly">
					<label>
						<span style="font-size: 15px">Банк</span>
						<input v-model="shop.shop_bank" class="input" readonly="readonly">
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">Номер расчетного счета</span>
						<input v-model="shop.shop_bank_account" class="input" readonly="readonly">
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">Корреспондентский счет</span>
						<input v-model="shop.shop_account" class="input" readonly="readonly">
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">БИК</span>
						<input v-model="shop.shop_bik" class="input" readonly="readonly">
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">ИНН</span>
						<input v-model="shop.shop_taxcode" class="input" readonly="readonly">
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">КПП</span>
						<input v-model="shop.shop_taxreasoncode" class="input" readonly="readonly">
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px" >Юридический адрес</span>
						<textarea v-model="shop.shop_regaddress" readonly="readonly"></textarea>
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px" >Адрес</span>
						<textarea v-model="shop.shop_address" readonly="readonly"></textarea>
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px" >Название сети</span>
						<input v-model="shop.net_name" class="input" readonly="readonly">
					</label>
					</div>

					<div class='clear'></div>
					<button class="btn" v-on:click="close">Закрыть</button>
				</div>
			</div>
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
		shop() {
			return this.$store.getters.shop
		},
	},
	methods: {
		close() {
			this.$store.commit('set', {type: 'showShopWnd', items: false})
		}
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
