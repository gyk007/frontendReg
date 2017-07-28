<template>
<section class="delete_wnd" id="popup__delete_client">
	<div class="delete_wnd_hdr">Удалить клиета</div>
	<div class="btn_delete_wnd_form">
		<button class="btn_delete_wnd_ok" v-on:click="deleteClient">Удалить</button>
		<button class="btn_delete_wnd_cancel" v-on:click="closeWnd">Отмена</button>
	</div>
</section>
</template>

<script>
  import store  from '../../store/client.js'
  import $      from 'jquery'

  export default {
	computed: {
		client() {
			return this.$store.getters.client
		},
	},
	methods: {
		deleteClient() {
			console.log(this.client);
			this.$store.dispatch('deleteClient', this.client.id)
			this.$store.dispatch('selectClient', null)

			$.fancybox.close()
		},
		closeWnd() {
			this.$store.dispatch('selectClient', null)
			$.fancybox.close()
		}
	},
  }
</script>

