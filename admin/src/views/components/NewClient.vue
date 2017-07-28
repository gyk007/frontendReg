<template>
	<section class="popup popup__category" id="popup__client">

	<div class="popup__hdr" v-if="!client.name">Добавить клиента</div>
	<div class="popup__hdr" v-if="client.name">{{client.name}}</div>

	<div class="popup__category-form client_form">

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">Название Клиента</span>
			<input v-model="client.name" placeholder="Азбука вкуса" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">Имя представителя</span>
			<input v-model="client.person" placeholder="Николаев Николай Николаевич" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">Телефон</span>
			<input v-model="client.phone" placeholder="+7 999 999 99 99" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">E-mail</span>
			<input v-model="client.email" placeholder="AzbykaVkysa@gmail.com" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">Банк</span>
			<input v-model="client.bank" placeholder="Сбербанк" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">Номер расчетного счета</span>
			<input v-model="client.account_number" placeholder="3012300077350" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">Корреспондентский счет</span>
			<input v-model="client.correspondent_account" placeholder="3012300077350" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">БИК</span>
			<input v-model="client.bik" placeholder="041501001" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">ИНН</span>
			<input v-model="client.inn" placeholder="7710152113" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">КПП</span>
			<input v-model="client.kpp" placeholder="771001001" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">ОГРН</span>
			<input v-model="client.ogrn" placeholder="1027700505348" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px">Пароль</span>
			<input v-model="client.password" placeholder="Password" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px" >Юредический адрес</span>
			<textarea v-model="client.delivery_address" placeholder="Волоколамское шоссе, д. 89 (рядом с Институтом повышения квалификации ФМБА)"></textarea>
		</label>
		</div>

		<div class="popup__product-form--holder client_holder">
		<label>
			<span style="font-size: 15px" >Адрес</span>
			<textarea v-model="client.legal_address" placeholder="Волоколамское шоссе, д. 89 (рядом с Институтом повышения квалификации ФМБА)"></textarea>
		</label>
		</div>


		<div class='clear'></div>
		<button class="btn" v-on:click="addClient"  v-if="!client.name">Добавить</button>
		<button class="btn" v-on:click="editClient" v-if="client.name">Редактировать</button>

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
		addClient() {
			this.$store.dispatch('addClient', this.client)
			this.$store.dispatch('selectClient', null)
			$.fancybox.close()
		},
		editClient() {
			this.$store.dispatch('editClient', this.client)
			this.$store.dispatch('selectClient', null)
			$.fancybox.close()
		}
	}
}

</script>

