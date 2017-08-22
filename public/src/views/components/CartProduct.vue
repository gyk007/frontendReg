<template>
<section class="p-card__products">
<div class="p-card__products--inner">
	<div class="p-card__products-header">
		<span>Продукция на сумму: {{cartPrice}} &nbsp;<i class="rub">a</i></span>
		<router-link to="/catalog" class="btn btn--add">Добавить товар</router-link>
	</div>
<div v-if='cart && cart.products'>
<div class="product"  v-for='el in cart.products.elements'>

<div class="product__row js-t-row" >
	<div class="product__cell product__name">
		<div class="product__name-img">
			<a href="#"><img src="pic/products/abrau_brut.png" alt="product"></a>
		</div>
		<div class="product__name-title">
			<a href="#">{{el.product.name}}</a>
		</div>
	</div>

	<div class="product__cell product__quantity">
		<input type="text" class="input" v-model="el.quantity" @keyup ='calculateCartPrice'>
		<span>шт</span>
	</div>

	<div class="product__cell product__cost">
		<div class="product__cost-item">{{el.product.price}}&nbsp;<i class="rub">a</i>&nbsp;/&nbsp;шт</div>
		<div class="product__cost-all">{{parseFloat((el.product.price * el.quantity).toFixed(2))}}&nbsp;<i class="rub">a</i></div>
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
 			calculateCartPrice() {
				this.$store.dispatch('calculateCartPrice')
			}
		},
		created: function() {
			this.$store.dispatch('getCart')
		},

	}
</script>