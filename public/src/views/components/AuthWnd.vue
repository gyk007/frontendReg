<template>
	<section class="popup popup__category" id="popup__auth">


	<div class="popup__hdr">Авторизация</div>

	<div class="popup__category-form">
		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px">Email</span>
			<input type="email" class="input" v-model="login"/>
		</label>
		</div>
		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px">Пароль</span>
			<input type="password" class="input" v-model="password"/>
		</label>
		</div>

		<button class="btn" v-on:click="auth">Вход</button>

	</div>
</section>
</template>


<script>
  import store from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
	data() {
		return {
			login    : undefined,
			password : undefined
		}
	},
	methods: {
		auth() {
			this.$store.dispatch('authorization', this.$data)
		},
	},
	mounted: function() {
		$.fancybox.open({
			src  : '#popup__auth',
			type : 'inline',
			modal : true
		});
	},
  }
</script>

