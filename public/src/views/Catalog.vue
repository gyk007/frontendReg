<template>
	<section class="catalog" id='catalog'>
		<Search></Search>
		<div class="shop__container">
		<CatalogTree></CatalogTree>
		<Catalog></Catalog>
		</div>
	</section>
</template>

<script>

import Search       from './components/SearchProduct.vue'
import Catalog      from './components/CatalogProduct.vue'
import CatalogTree  from './components/CatalogTree.vue'
import Store        from '../store/catalog.js'

import $            from 'jquery'

export default {
	name: 'catalog',
	components: { Search, Catalog, CatalogTree},
	store: Store,
	computed: {
		category() {
			return this.$store.getters.category
		},
	},
	methods: {
		unselectCategoory(){
			$('.js-catalog-category a').removeClass('active')
			this.$store.dispatch('selectCategory', null)
		},
		upCategoory(category){
			this.$store.dispatch('leftCategory', category.id)
		},
		downCategoory(category){
			this.$store.dispatch('rightCategory', category.id)
		},
		inCategoory(category) {
			this.$store.dispatch('inCategory', category.id)
		}
	},
	created: function() {
		this.$store.dispatch('selectCategory', null)
	}
}

</script>
