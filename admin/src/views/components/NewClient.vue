<template>
	<section class="popup popup__category" id="popup__client">

	<div class="popup__hdr" v-if="!client"></div>
	<div class="popup__hdr" v-if="client.official.name">{{client.official.name}}</div>

	<div class="popup__category-form client_form">

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">Название</span>
			<input v-model="client.official.name" class="input" readonly="readonly">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">Имя представителя</span>
			<input v-model="client.official.person" class="input" readonly="readonly">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">Телефон</span>
			<input v-model="client.official.phone" class="input" readonly="readonly">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">E-mail</span>
			<input v-model="client.official.email"class="input" readonly="readonly">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder" readonly="readonly">
		<label>
			<span style="font-size: 15px">Банк</span>
			<input v-model="client.official.bank" class="input" readonly="readonly">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">Номер расчетного счета</span>
			<input v-model="client.official.bank_account" class="input" readonly="readonly">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">Корреспондентский счет</span>
			<input v-model="client.official.account" class="input" readonly="readonly">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">БИК</span>
			<input v-model="client.official.bik" class="input" readonly="readonly">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">ИНН</span>
			<input v-model="client.official.taxcode" class="input" readonly="readonly">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">КПП</span>
			<input v-model="client.official.taxreasoncode" class="input" readonly="readonly">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px" >Юредический адрес</span>
			<textarea v-model="client.official.regaddress" readonly="readonly"></textarea>
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px" >Адрес</span>
			<textarea v-model="client.official.address" readonly="readonly"></textarea>
		</label>
		</div>


		<div class='clear'></div>
		<button class="btn" v-on:click="close">Закрыть</button>

	</div>
</section>
</template>


<script>
  import store from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
	computed: {
		client() {
			return this.$store.getters.client
				? this.$store.getters.client
				: {

					id                    : '',
					name                  : '',
					person                : '',
					delivery_address      : '',
					legal_address         : '',
					phone                 : '',
					email                 : '',
					password              : '',
					logo                  : '',
					bank                  : '',
					account_number        : '',
					correspondent_account : '',
					bik                   : '',
					inn                   : '',
					kpp                   : '',
					ogrn                  : '',
				}
		},
	},
	methods: {
		close() {
			$.fancybox.close()
		}
	}
}

</script>

