<template>
 <section class="new_category">
	<button class='new_category_button' v-on:click="addCategory()">Добавить</button>
	<button class='new_category_button' v-on:click="editCategory()">Редактировать</button>
	<input v-model="category.face" placeholder="face">
	<input v-model="category.name" placeholder="name">
	<textarea v-model="category.description" placeholder="description"></textarea>
	<input type="checkbox" v-model="visible">
 </section>
</template>


<script>
  import store from '../../store/catalog.js'

  export default {
	computed: {
  		category() {
        	return this.$store.getters.category
        },
    },
	methods: {
		addCategory() {
			this.$store.dispatch('addCategory', this.category);
		},
		editCategory() {
			this.$store.dispatch('editCategory', this.category);
		}
	}
  }
</script>

