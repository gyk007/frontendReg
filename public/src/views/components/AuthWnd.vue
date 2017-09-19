<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">

					<div class="modal__hdr">Авторизация</div>
					<div class="modal__hdr_error" v-if='authError'>Вы ввели неправильный пароль или email</div>

					<div class="popup__product-form--holder">
						<input type="email" class="input" v-model="login" placeholder="Email"/>
					</div>
					<div class="popup__product-form--holder">
						<input type="password" class="input" v-model="password" placeholder="Password"/>
					</div>

					<button class="modal_btn btn" v-on:click="auth">Вход</button>
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
	computed: {
		authError() {
			return this.$store.getters.authError;
		},
	},
	methods: {
		auth() {
			this.$store.dispatch('authorization', this.$data)
		},
	},
	mounted: function() {
		// По нажатию кнопки Enter выполняем авторизацию,
		// выполняем метод auth()
		let	$this = this;
		document.onkeyup = function (e) {
			e = e || window.event;
			if (e.keyCode === 13) {
				$this.auth();
			}
			return false;
		}
	},
  }
</script>

