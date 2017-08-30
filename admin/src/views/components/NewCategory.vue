<template>
	<section class="popup popup__category" id="popup__category">

	<div class="popup__hdr" v-if="!category.name">Добавить категорию</div>
	<div class="popup__hdr" v-if="category.name">Редактировать категорию</div>

	<div class="popup__category-form">
		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px">Название Категории</span>
			<input   v-model="category.name"  placeholder="" class="input">
		</label>
		</div>
		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px" >Описание Категории</span>
			<textarea v-model="category.description" placeholder=""></textarea>
		</label>
		</div>
		<div class="popup__product-form--holder">
			<label>
				<input type="checkbox" class="checkbox"  v-model="category.visible">
				<span style="font-size: 15px">Показать в публичной части</span>
			</label>
		</div>

		<button class="btn" v-on:click="addCategory"  v-if="!category.name">Добавить</button>
		<button class="btn" v-on:click="editCategory" v-if="category.name">Редактировать</button>


	</div>
</section>
</template>


<script>
  import store from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
	computed: {
		category() {
			let category = {
				id          : this.$store.getters.category ? this.$store.getters.category.id          : undefined,
				name        : this.$store.getters.category ? this.$store.getters.category.name        : '',
				description : this.$store.getters.category ? this.$store.getters.category.description : '',
				visible     : this.$store.getters.category ? this.$store.getters.category.visible     : false,
			}

			return category;
		},
	},
	methods: {
		addCategory() {
			this.$store.dispatch('addCategory', this.category)
			this.$store.dispatch('selectCategory', null)
			$('.js-catalog-category a').removeClass('active')
			$.fancybox.close()
		},
		editCategory() {
			this.$store.dispatch('editCategory', this.category)
			this.$store.dispatch('selectCategory', null)
			$('.js-catalog-category a').removeClass('active')
			$.fancybox.close()
		}
	},
  }
</script>

