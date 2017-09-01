<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
			<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container-merchant">
				<div class="modal__hdr">Представитель</div>

				<div class="popup__category-form client_form" v-if='merchant'>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">E-mail <span style='color:#f44336' v-if='validateEmail'>Введите корректный Email</span></span>
						<input v-model="merchant.email" :class="{ valid_imnput : validateEmail }" class="input" @keyup='resetValid'>
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">Имя Фамилия</span>
						<input v-model="merchant.name" class="input" readonly="readonly">
					</label>
					</div>

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">Телефон</span>
						<input v-model="merchant.phone"class="input" readonly="readonly">
					</label>
					</div>

					<div class='clear'></div>


				</div>

				<div class='btn_list'>
					<button class="modal_btn_big_text btn_in_list modal_btn btn" v-on:click="regWnd">Сбросить пароль</button>
					<button class="btn_in_list modal_btn btn" v-on:click="close">Закрыть</button>
					<div class="clear"></div>
				</div>

			</div>
		</div>
			<RegistrWnd v-if='showRegWnd'></RegistrWnd>
		</div>
	</transition>
</template>


<script>
  import store       from '../../store/catalog.js'
  import $          from 'jquery'
  import RegistrWnd from './RegistrWnd.vue'


  export default {
  	components: {RegistrWnd},
  	data() {
		return {
			validateEmail : false,
		}
	},
	computed: {
		merchant() {
			return this.$store.getters.merchant
		},
		showRegWnd() {
			return this.$store.getters.showRegWnd
		},
	},
	methods: {
		close() {
			this.$store.commit('set', {type: 'showMerchantWnd', items: false})
		},
		regWnd(){
			this.$data.validateEmail = false;
			// Регулярное выражение проверки email
			let rEmail = /^\w+@\w+\.\w{2,4}$/i;
			if (rEmail.test(this.merchant.email)) {
	 			this.$store.commit('set', {type: 'showRegWnd', items: true})
			} else {
				this.$data.validateEmail = true;
			}
		},
		resetValid(){
			this.$data.validateEmail = false;
		}
	},
	beforeCreate: function() {
		this.$store.dispatch('getNetMerchant')
	}
  }
</script>

