<template>
  <section class="catalog_tree">
  <ul>
  	<li v-for="category in catalogTree">
  		<div  v-on:click="getProductList(category.id)"  v-on:mouseover="hoverCategory(category)">{{category.name}}</div>
  		<button class='delete_category_button' v-on:click="deleteCategory(category.id)">Удалить</button>
  		<button class='edit_category_button'   v-on:click="selectCategory(category)">Редактировать</button>
  		<ul v-if="category.child">
  			<li v-for="cat in category.child">
  				<div    v-on:click="getProductList(cat.id)" v-on:mouseover="hoverCategory(cat.id)">{{cat.name}}</div>
  				<button class='delete_category_button' v-on:click="deleteCategory(cat.id)">Удалить</button>
  				<button class='edit_category_button'   v-on:click="selectCategory(cat)">Редактировать</button>
  			</li>
  		</ul>
  	</li>
  </ul>
  </section>
</template>

<script>
  import store from '../../store/catalog.js'

  export default {
  	computed: {
  		catalogTree() {
        	return this.$store.getters.catalogTree
      	},
  	},
  	methods: {
  		getProductList(idCat) {
  			this.$store.dispatch('getProductList', idCat)
  		},
  		hoverCategory(idCat) {
  			// console.log(idCat)
  		},
  		deleteCategory(idCat) {
  			this.$store.dispatch('deleteCategory', idCat)
  		},
  		selectCategory(category) {
  			this.$store.dispatch('selectCategory', category)
  		},
  	},
  	created: function() {
  		this.$store.dispatch('getCatalogTree')
  	}
  }
</script>

