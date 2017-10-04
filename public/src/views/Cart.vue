<template>
 <div class="p-card">
 	<div class="p-card__container">
	<div class="page-title_cart"><span>Продукция на сумму: {{cartPrice.toLocaleString('ru-RU')}} &nbsp;<i class="rub">a</i></span></div>
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
		cartPrice() {
			return this.$store.getters.cartPrice;
		},
	},
	methods: {
	},
	created: function() {
		//this.$store.dispatch('selectCategory', null)
	}
}

</script>