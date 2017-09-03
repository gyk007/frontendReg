<template>
<section class="p-card__products">
<div class="p-card__products--inner">
	<div class="p-card__products-header">
		<span>Продукция на сумму: {{cartPrice}} &nbsp;<i class="rub">a</i></span>
		<!-- <router-link to="/catalog" class="btn btn--add">Добавить товар</router-link> -->
	</div>
<div v-if='cart && cart.products'>
<div class="product"  v-for='el in cart.products.elements'>

<div class="product__row js-t-row" >
	<div class="product__cell product__name">
		<div class="product__name-img">
			<img src="pic/batle.png" alt="product">
		</div>
		<div class="product__name-title">
			{{el.product.name}}
		</div>
	</div>

	<div class="product__cell product__quantity">
		<input type="number"  min="1" class="input" :value="el.quantity" @blur ='calculateCartPrice(el)' :class="{ valid_imnput : el.quantity == 0 }">
		<span>шт</span>
	</div>

	<div class="product__cell product__cost">
		<div class="product__cost-item">{{parseFloat(el.product.price).toFixed(2)}}&nbsp;<i class="rub">a</i>&nbsp;/&nbsp;шт</div>
		<div class="product__cost-all">{{parseFloat(el.product.price * el.quantity).toFixed(2)}}&nbsp;<i class="rub">a</i></div>
	</div>
	<div class="product__cell product__btn" @click='deletProduct(el.id_product)'>
		<div class="product__btn-inner"><svg><use xlink:href="#circle-cross"></use></svg></div>
	</div>
</div>


</div>
</div>

	</div>
</section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'

	export default {
		computed: {
			cart() {
				return this.$store.getters.cart
			},
			cartPrice() {
				return this.$store.getters.cartPrice;
			},
		},
		methods: {
			deletProduct(idProduct) {
				this.$store.dispatch('deletProdInCart', idProduct)
			},
 			calculateCartPrice(product) {
 				let  qty =  $(event.target).val();
 				// Количество которое прибавили к уже имеющимуся
 				product.quantity = qty - product.quantity;
 				this.$store.dispatch('updateQtyProdInCart', product)
				this.$store.dispatch('calculateCartPrice')
			}
		},
		created: function() {
			this.$store.dispatch('getCart')
		},

	}
</script>