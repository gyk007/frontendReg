<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
			<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container">

					<div class="modal__hdr">Вы дейсвительно хотите сбросить пароль ?</div>
					<div class='btn_list'>
						<button class=" btn_in_list modal_btn btn" v-on:click="send_mail">Сбросить</button>
						<button class=" btn_in_list modal_btn btn" v-on:click="close">Отмена</button>
						<div class="clear"></div>
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
	data() {
		return {
			email : this.$parent.merchant.email
		}
	},
	methods: {
		close() {
			this.$store.commit('set', {type: 'showRegWnd', items: false})
		},
		send_mail() {
			console.log(this.$data.email)
			this.$store.dispatch('sendRegEmail', this.$data.email.trim())
			this.$store.commit('set', {type: 'showRegWnd', items: false})
		},
	},
  }
</script>

