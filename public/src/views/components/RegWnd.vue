<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container-merchant">

					<div class="modal__hdr">Ваши данные</div>

					<p style='color: #f44336' v-if ='regError || !merchant || isSetPassword'>Регистрация невозможна, обратитесь к администратору</p>
					<p style='color: #f44336; text-align:center' v-if ='validate.confirmPassword'>Пароль не подтвержден</p>

					<div class="popup__category-form client_form" v-if ='!regError && merchant && !isSetPassword'>

						<div class="popup__product-form--holder client_holder">
						<label>
							<span style="font-size: 15px">E-mail</span>
							<input v-model="merchant.email"  class="input"  readonly="readonly">
						</label>
						</div>

						<div class="popup__product-form--holder client_holder">
						<label>
							<span style="font-size: 15px">Пароль</span>
							<input type='password' v-model="merchant.password" class="input" :class="{ valid_imnput : validate.password }">
						</label>
						</div>

						<div class="popup__product-form--holder client_holder">
						<label>
							<span style="font-size: 15px">Подтвердите пароль</span>
							<input type='password' v-model="merchant.confirmPassword"  class="input" :class="{ valid_imnput : validate.confirmPassword }">
						</label>
						</div>

						<div class="popup__product-form--holder client_holder">
						<label>
							<span style="font-size: 15px">Имя Фамилия Отчество (если есть)</span>
							<input v-model="merchant.name" class="input" :class="{ valid_imnput : validate.name }">
						</label>
						</div>

						<div class="popup__product-form--holder client_holder">
						<label>
							<span style="font-size: 15px">Телефон</span>
							<input v-model="merchant.phone"class="input" :class="{ valid_imnput : validate.phone }">
						</label>
						</div>

					<div class='clear'></div>


				</div>
				</br>
					<button class="modal_btn btn" style='width:170px' v-on:click="registration" v-if ='!regError'>Сохранить</button>
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
			validate : {
				password        : false,
				phone           : false,
				name            : false,
				confirmPassword : false,
			},
			isSetPassword : this.$store.getters.merchant ? this.$store.getters.merchant.password : false, // Проверка установлн ли пароль у данного представителя
		}
	},
	computed: {
		regError() {
			return this.$store.getters.regError;
		},
		merchant() {
			return this.$store.getters.merchant;
		},
	},
	methods: {
		registration() {
			// Сбрасываем валидацию и удаляем пробелы
			['password', 'phone', 'name'].forEach(key =>{
				this.$data.validate[key] = false;
				this.merchant[key]       = this.merchant[key].trim()
			})

			// Валидация
			if (this.merchant.password != this.merchant.confirmPassword) {
				this.$data.validate.confirmPassword = true;
			} else if (!this.merchant.password) {
				this.$data.validate.password = true;
			} else if (!this.merchant.name) {
				this.$data.validate.name = true;
			} else if (!this.merchant.phone) {
				this.$data.validate.phone = true;
			} else {
				this.merchant.regToken = this.$route.params.token;
				this.$store.dispatch('registration', this.merchant)
			}
		},
	},
  }
</script>

