<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
			<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>

				<div style="width:300px; margin: 0px auto;" v-if='sendMailLoader'><img  height='200' width='300' src="pic/send_mail.gif"></div>

				<div class="modal-container"  v-if='!sendMailLoader'>

					<div class="modal__hdr" v-if='isSendMail'>Ссылка на регистрацию отправлена по адресу:</br>{{email}}</div>

					<div v-if='!isSendMail'>
						<div class="modal__hdr" v-if='!error && isPassword'>Вы дейсвительно хотите сбросить пароль ?</div>
						<div class="modal__hdr" v-if='!error && !isPassword'>Отправить ссылку на регистрацию ?</div>
						<div class="modal__hdr" style='color: #f44336' v-if='error'>Такой Email уже используется</div>
						<div class='btn_list' v-if='!error'>
							<button class="btn_in_list modal_btn btn" v-on:click="send_mail">Отправить</button>
							<button class="btn_in_list modal_btn btn" style='background-color: #f48c42;' v-on:click="close">Отмена</button>
							<div class="clear"></div>
						</div>
					</div>

					<button v-if='error || isSendMail' class="modal_btn btn" style='background-color: #f48c42;' v-on:click="close">Закрыть</button>

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
			email      : this.$parent.merchant.email,
			isPassword : this.$parent.merchant.password,

		}
	},
	computed: {
		error() {
			return this.$store.getters.error
		},
		sendMailLoader() {
			return this.$store.getters.sendMailLoader
		},
		isSendMail() {
			return this.$store.getters.isSendMail
		},
	},
	methods: {
		close() {
			// Закрываем текущее окно
			this.$store.commit('set', {type: 'showRegWnd',      items: false})
			// Закрываем окно предсавителя
			this.$store.commit('set', {type: 'showMerchantWnd', items: false})

		},
		send_mail() {
			this.$store.dispatch('sendRegEmail', this.$data.email.trim())

		},
	},
	mounted: function() {
		this.$store.commit('set', {type: 'error', items: undefined})
	}
  }
</script>

