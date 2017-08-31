<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
			<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container-merchant">
				<div class="modal__hdr">Представитель</div>

				<div class="popup__category-form client_form">

					<div class="popup__product-form--holder client_holder">
					<label>
						<span style="font-size: 15px">E-mail</span>
						<input v-model="merchant.email" class="input">
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
	computed: {
		merchant() {
			let merchant = this.$store.getters.merchant ?
						this.$store.getters.merchant :
						{
							name     : undefined,
							password : undefined,
							phone    : undefined,
							email    : undefined,
						};

			return merchant;
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
			this.$store.commit('set', {type: 'showRegWnd', items: true})
		}
	},
	created: function() {
		this.$store.dispatch('getNetMerchant')
	}
  }
</script>

