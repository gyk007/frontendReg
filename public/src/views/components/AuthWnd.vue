<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">			 
				<div class="modal-container">

					<div class="popup__hdr">Авторизация</div>

					 
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
		</div>
		</div>
	</transition>
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
  }
</script>

