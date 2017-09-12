<template>
<section class="delete_wnd" id="popup__exit">
	<div class="popup__hdr">Выход</div>
	<div class="btn_delete_wnd_form">
		<button class="btn_delete_wnd_ok" v-on:click="exit" style='background-color: #9fc957;'>Выйти</button>
		<button class="btn_delete_wnd_cancel" v-on:click="closeWnd" style='background-color: #f48c42;'>Отмена</button>
	</div>
</section>
</template>

<script>
  import store   from '../../store/catalog.js'
  import $       from 'jquery'
  import Cookies from 'js-cookie'

  export default {
	methods: {
		exit() {
			Cookies.remove('token')
			$.fancybox.close()
			document.location = '/#/auth'
			window.location.reload()
		},
		closeWnd() {
			$.fancybox.close()
		}
	},
  }
</script>
