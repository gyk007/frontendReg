<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
			<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>

				<div style="width:300px; margin: 0px auto;" v-if='sendMailLoader'><img  height='200' width='300' src="pic/send_mail.gif"></div>

				<div class="modal-container"  v-if='!sendMailLoader'  :class="{ bigWnd: merchantAlreadyReg }">

					<div class="modal__hdr" v-if='isSendMail'>Ссылка на регистрацию отправлена по адресу:</br>{{email}}</div>

					<div v-if='!isSendMail'>
						<div class="modal__hdr" v-if='!merchantAlreadyReg && isPassword'>Вы дейсвительно хотите сбросить пароль ?</div>
						<div class="modal__hdr" v-if='!merchantAlreadyReg && !isPassword'>Отправить ссылку на регистрацию ?</div>

						<div v-if='merchantAlreadyReg' class="modal__hdr" style='font-size: 14px;'>Email {{merchantAlreadyReg.email}} уже использует

							<p v-if='merchantAlreadyReg.name'>{{merchantAlreadyReg.name}}</p>

							<p v-if='merchantAlreadyReg.net'></br>Доступные организации: </p>

							<p v-if='merchantAlreadyReg.net' v-for='(net, index) in merchantAlreadyReg.net' style="text-align: justify">
								{{++index}}. {{net.official.name}}
							</p>

							<p v-if='merchantAlreadyReg.shops'></br>Доступные магазины: </p>

							<p v-if='merchantAlreadyReg.shops' v-for='(shop, index) in merchantAlreadyReg.shops' style="text-align: justify">
								{{++index}}. {{shop.official.name}}
							</p>
							</br>
							<p v-if='shop && !merchantAlreadyReg.accessToThisShop'>Добавить данного менеджера для магазина : </br> {{shop.official.name}} ?</p>
							<p v-if='shop && merchantAlreadyReg.accessToThisShop'>Доступ к данному магазину у этого менеджера уже есть</p>
							<p v-if='!shop'>Добавить данного менеджера для организации : </br> {{net.official.name}} ? </p>
							</br>
						</div>

						<div class='btn_list' v-if='!merchantAlreadyReg'>
							<button class="btn_in_list modal_btn btn" v-on:click="sendMail">Отправить</button>
							<button class="btn_in_list modal_btn btn" style='background-color: #f48c42;' v-on:click="close">Отмена</button>
							<div class="clear"></div>
						</div>
					</div>


					<div class='btn_list' v-if='merchantAlreadyReg && !merchantAlreadyReg.accessToThisShop'>
						<button class="btn_in_list modal_btn btn" v-on:click="addTo">Добавить</button>
						<button class="btn_in_list modal_btn btn" style='background-color: #f48c42;' v-on:click="close">Отмена</button>
						<div class="clear"></div>
					</div>
					<button v-if='merchantAlreadyReg && merchantAlreadyReg.accessToThisShop' class="modal_btn btn" style='background-color: #f48c42;' v-on:click="close">Закрыть</button>

					<button v-if='isSendMail' class="modal_btn btn" style='background-color: #f48c42;' v-on:click="close">Закрыть</button>

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
		merchantAlreadyReg() {
			if(this.$store.getters.merchantAlreadyReg && this.$store.getters.shop) {
				this.$store.getters.merchantAlreadyReg.shops.forEach(key => {
					if (key.id == this.$store.getters.shop.id) {
						// Доступ в выбранный магазин уже есть
						this.$store.getters.merchantAlreadyReg.accessToThisShop = true;
					}
				});
			}
			return this.$store.getters.merchantAlreadyReg
		},
		sendMailLoader() {
			return this.$store.getters.sendMailLoader
		},
		isSendMail() {
			return this.$store.getters.isSendMail
		},
		shop(){
			return this.$store.getters.shop
		},
		net(){
			return this.$store.getters.net
		}
	},
	methods: {
		close() {
			// Закрываем текущее окно
			this.$store.commit('set', {type: 'showRegWnd',      items: false})
			this.$store.commit('set', {type: 'merchantAlreadyReg', items: undefined})
		},
		sendMail() {
			this.$store.dispatch('sendRegEmail', this.$data.email.trim())
		},
		addTo() {
			if (this.shop) {
				// Если есть выбранный магазин добавляем менеджера в магазин
				this.$store.dispatch('addMerchantToShop', {
					shop     : this.shop,
					merchant : this.merchantAlreadyReg
				})
			} else {
				// Если нет выбранного магазина добавляем менеджера в организацию
				this.$store.dispatch('addMerchantToNet', {
					net      : this.net,
					merchant : this.merchantAlreadyReg
				})
			}
		}
	},
	mounted: function() {
		this.$store.commit('set', {type: 'merchantAlreadyReg', items: undefined})

		// По нажатию кнопки ESC закрываем окно,
		// выполняем метод close()
		let	$this = this;
		document.onkeyup = function (e) {
			e = e || window.event;
			if (e.keyCode === 27) {
				$this.close();
			}
			return false;
		}
	}
  }
</script>

