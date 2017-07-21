<template>
 <div class="p-card">
 	<div class="p-card__container">
	<div class="page-title">Корзина</div>
	<CardAddress></CardAddress>
	<CardProduct></CardProduct>
	</div>
</div>
</template>

<script>

import CardProduct from './components/CardProduct.vue'
import CardAddress from './components/CardAddress.vue'
import Store       from '../store/promotion.js'
import $           from 'jquery'

export default {
	name: 'card',
	components: {CardAddress, CardProduct},
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