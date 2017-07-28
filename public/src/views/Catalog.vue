<template>
	<section class="catalog" id='catalog'>
		<div class="a-catalog__hdr">
			<div class="a-catalog__hdr-title">Магазин</div>
			<Search></Search>
		</div>
		<div class="shop__container">
		<Filters></Filters>
		<Catalog></Catalog>
		</div>
	</section>
</template>

<script>

import Search       from './components/Search.vue'
import Filters      from './components/Filters.vue'
import Catalog      from './components/CatalogProduct.vue'
import Store        from '../store/catalog.js'

import $            from 'jquery'

export default {
	name: 'catalog',
	components: { Search, Filters, Catalog},
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
