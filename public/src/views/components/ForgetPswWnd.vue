<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div style="width:300px; margin: 0px auto;" v-if='sendMailLoader'><img  height='200' width='300' src="pic/send_mail.gif"></div>

				<div class="modal-container" v-if='!sendMailLoader && !passwordWasResseted'>
					<a href="http://grd77.shop/" class="auth_logo">
						<img src="pic/logo.png" alt="logo">
					</a>
					<div class="modal__hdr">Востановление пароля</div>
					<div class="modal__hdr_error" v-if='forgetPasswordError'>Такого email адреса не существует</div>

					<div class="popup__product-form--holder">
						<input type="email" class="input" v-model="mail" placeholder="Email"/>
					</div>

					<button class="modal_btn btn" style='width:170px' v-on:click="resetPassword">Востановить пароль</button>

					<a href="http://grd77.shop/" class="auth_back">Вернуться на сайт</a>
				</div>

				<div class="modal-container" v-if='!sendMailLoader && passwordWasResseted'>
					<a href="http://grd77.shop/" class="auth_logo">
						<img src="pic/logo.png" alt="logo">
					</a>
					<div class="modal__hdr" style='font-size:15px'>Нa адрес </br>{{mail}}</br> выслано письмо с ссылкой на форму сброса пароля</div>


					<a href="http://grd77.shop/" class="auth_back">Вернуться на сайт</a>
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
			mail : undefined,
		}
	},
	computed: {
		forgetPasswordError() {
			return this.$store.getters.forgetPasswordError;
		},
		passwordWasResseted(){
			return this.$store.getters.passwordWasResseted;
		},
		sendMailLoader(){
			return this.$store.getters.sendMailLoader;
		},
	},
	methods: {
		resetPassword() {
			if (this.$data.mail && this.$data.mail.trim()) {
				this.$data.mail = this.$data.mail.trim();
				this.$store.dispatch('forgetPassword', this.$data.mail);
			}
		},
	},
	mounted: function() {
		// По нажатию кнопки Enter выполняем авторизацию,
		// выполняем метод auth()
		let	$this = this;
		document.onkeyup = function (e) {
			e = e || window.event;
			if (e.keyCode === 13) {
				$this.resetPassword();
			}
			return false;
		}
	},
  }
</script>

