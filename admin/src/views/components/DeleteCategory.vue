<template>
<section class="delete_wnd" id="popup__delete_category">
	<div class="delete_wnd_hdr">Удалить категорию</div>
	<div><p>Вы действительно хотите удалить выбранную категорию?</p></div>
	<div class="btn_delete_wnd_form">
		<button class="btn_delete_wnd_ok" v-on:click="deleteCategory" style='background-color: #9fc957;'>Удалить</button>
		<button class="btn_delete_wnd_cancel" v-on:click="closeWnd" style='background-color: #f48c42;'>Отмена</button>
	</div>
</section>
</template>

<script>
  import store  from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
	computed: {
		category() {
			return this.$store.getters.category
		},
	},
	methods: {
		deleteCategory() {
			this.$store.dispatch('deleteCategory', this.category.id)
			this.$store.dispatch('selectCategory', null)
			$.fancybox.close()
		},
		closeWnd() {
			this.$store.dispatch('selectCategory', null)
			$.fancybox.close()
		}
	},
  }
</script>

