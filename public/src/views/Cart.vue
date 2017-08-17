<template>
 <div class="p-card">
 	<div class="p-card__container">
	<div class="page-title">Корзина</div>
	<CartAddress></CartAddress>
	<CartProduct></CartProduct>
	</div>
</div>
</template>

<script>

import CartProduct from './components/CartProduct.vue'
import CartAddress from './components/CartAddress.vue'
import Store       from '../store/catalog.js'
import $           from 'jquery'

export default {
	name: 'card',
	components: {CartAddress, CartProduct},
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
		 // $('.js-catalog-category a').removeClass('active')
			this.$store.dispatch('leftCategory', category.id)
		},
		downCategoory(category){
			$('.js-catalog-category a').removeClass('active')
			this.$store.dispatch('rightCategory', category.id)
		},
	},
	created: function() {
		//this.$store.dispatch('selectCategory', null)
	}
}

</script>