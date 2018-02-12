<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
   <q-modal ref="AuthWnd" :no-backdrop-dismiss='true'>
		<div class='modal_body'>
			<h5>Вход</h5>
			<span v-if='authError' class='authError'>Неправильно ввели логин или пароль</span>
			<q-input stack-label="Email"   v-model="login"    class='modal_input' />
			<q-input stack-label="Пароль"  v-model="password" class='modal_input' />
			 
			 
			<div class="btn_block">
				<q-btn color="secondary" icon="done all" @click="auth()">Вход</q-btn>				 
			</div>
			 
		</div>
	</q-modal>
  </div>
</template>

<script> 
import store        from '../store/store.js'
import {QModal, QBtn, QIcon, QInput, QField} from 'quasar' 

export default {
  name: 'manager',
  store: store,
  components: {QModal, QBtn, QIcon, QInput, QField},
  computed: {
		authError() {
			return this.$store.getters.authError
		}		 
	},
	data() {		 			 
		return {			 
			login    : undefined,   
			password : undefined,			 			 
		}			 
	},	 
	methods: {
		auth() {				 		
			this.$store.dispatch('auth', {login: this.login, password: this.password})			 		 	 
		}		 		
	},
	mounted: function() {
		this.$refs.AuthWnd.open()
	} 
}
</script>

<style>
 
.modal_body {
	padding: 15px; 
}
.modal_input {
	margin-bottom: 15px;
}

.btn_block {
	display: block;
	width: 120px;
	margin: 0 auto; 
}
.clear {
	clear: both;
}
.authError{
	color:red;
	font-size: 11px;
}
</style>
