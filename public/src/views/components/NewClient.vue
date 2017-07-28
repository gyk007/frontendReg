<template>
	<section class="popup popup__category" id="popup__client">

	<div class="popup__hdr" v-if="!client.name">Добавить клиента</div>
	<div class="popup__hdr" v-if="client.name">Редактировать клиента</div>

	<div class="popup__category-form">

		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px">Название Клиента</span>
			<input v-model="client.name" placeholder="Название Категории" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px">Имя представителя</span>
			<input v-model="client.person" placeholder="Имя представителя" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px">Телефон</span>
			<input v-model="client.phone" placeholder="Телефон" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px">E-mail</span>
			<input v-model="client.email" placeholder="E-mail" class="input">
		</label>
		</div>

		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px" >Адрес</span>
			<textarea v-model="client.address" placeholder="Адрес"></textarea>
		</label>
		</div>

		<button class="btn" v-on:click="addClient"  v-if="!client.name">Добавить</button>
		<button class="btn" v-on:click="editClient" v-if="client.name">Редактировать</button>

	</div>
</section>
</template>


<script>
  import store  from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
	computed: {
		client() {
			return this.$store.getters.client
				? this.$store.getters.client
				: {
					id      : '',
					name    : '',
					person  : '',
					address : '',
					phone   : '',
					email   : ''
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
	},
  }
</script>

