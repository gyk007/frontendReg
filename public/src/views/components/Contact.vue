<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper" >
				<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>

				<div style="width:300px; margin: 0px auto;" v-if='sendMailLoader'><img  height='200' width='300' src="pic/send_mail.gif"></div>

				<div v-if='!sendMailLoader && !isSentMail' class="modal-container-select-shop">
					<div class="modal__hdr">Обратная связь</div>

						<div class="popup__product-form--holder">
						<label>
							<span style="font-size: 15px">Ваш вопрос</span>
							<textarea v-model='text'></textarea>
						</label>
						</div>

						<div class='btn_list'>
							<button class=" btn_in_list modal_btn btn" v-on:click="sent">Отправить</button>
							<button class=" btn_in_list modal_btn btn" style='background-color: #f48c42;' v-on:click="close">Отмена</button>
							<div class="clear"></div>
						</div>
				</div>

				<div v-if='isSentMail && !sendMailLoader' class="modal-container-select-shop">
					<div class="modal__hdr">Ваше письмо успешно отправлено</div>
					<button class="btn" style='display: block; background-color: #f48c42; width: 100px; margin: 0 auto;' v-on:click="close">Закрыть</button>
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
			text  : undefined,
		}
	},
  	computed: {
			isSentMail() {
				return this.$store.getters.isSentMail
			},
			sendMailLoader() {
				return this.$store.getters.sendMailLoader
			},
		},
	methods: {
		sent() {
 			this.$store.dispatch('sendMail', this.$data.text);
		},
		close(){
			this.$store.commit('set', {type: 'contactWnd', items: false})
		}
	},
	mounted: function() {
		//  Указываем что письмо не отправлено
		this.$store.commit('set', {type: 'isSentMail', items: false})
		// Выключаем лоадер
		this.$store.commit('set', {type: 'sendMailLoader', items: false})
	}
  }
</script>

