<template>
	<section class="popup popup__category" id="popup__auth">


	<div class="popup__hdr" v-if='!auttError'>Авторизация</div>
	<div class="popup__hdr" style='color:#f44336' v-if='auttError'>Непраильный логин или пароль</div>

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
  	computed: {
		authError() {
			return this.$store.getters.authError
		},
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

