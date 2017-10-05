<!--
	Контейнер корзина.
	Содержит компаненты для корзины:
	- CartProduct.vue
	- CartAddress.vue
	- DeleteCartProductWnd.vue
-->
<template>
 <div class="p-card">
 	<div class="p-card__container">
	<div class="page-title_cart">
		<span>Продукция на сумму: {{cartPrice.toLocaleString('ru-RU')}} &nbsp;<i class="rub">a</i></span>

        <div class="a-catalog__hdr-controls" style="float: right; margin-right:20px" v-if='selectedCartProduct'>
            <div class="btn btn--delete" @click='showDeleteWnd'>Удалить из корзины</div>
        </div>

	</div>



	<CartAddress></CartAddress>
	<CartProduct></CartProduct>
	<DeletWnd v-if='showDelCartProdWnd'></DeletWnd>
	</div>
</div>
</template>

<script>

import CartProduct from './components/CartProduct.vue'
import CartAddress from './components/CartAddress.vue'
import DeletWnd    from './components/DeleteCartProductWnd.vue'
import Store       from '../store/catalog.js'
import $           from 'jquery'

export default {
	name: 'card',
	components: {CartAddress, CartProduct, DeletWnd},
	store: Store,
	computed: {
		cartPrice() {
			return this.$store.getters.cartPrice;
		},
		selectedCartProduct() {
			return this.$store.getters.selectedCartProduct;
		},
		showDelCartProdWnd() {
			return this.$store.getters.showDelCartProdWnd;
		}
	},
	methods: {
		showDeleteWnd() {
			this.$store.commit('set', {type: 'showDelCartProdWnd', items: true})
		},
	},
}

</script>