<template>
<section class="order-ls__product">
<div class="order-ls__product--holder">

	<div class="p-card__products-header">
		<span>Продукция на сумму: {{parseFloat(orderPrice.toFixed(2))}} &nbsp;<i class="rub">a</i></span>
	</div>

	<div class="product">

		<div class="product__row js-t-row"  v-for='el in order.products.elements'>
			<div class="product__cell product__name">
				<div class="product__name-img">
					<img src="pic/batle.png" alt="product">
				</div>
				<div class="product__name-title">
					{{el.product.name}}
				</div>
			</div>

			<div class="product__cell product__quantity">
				<div class="product__cost-item">{{el.qty}}&nbsp;шт</div>
			</div>

			<div class="product__cell product__cost">
				<div class="product__cost-item">{{el.price}}&nbsp;<i class="rub">a</i>&nbsp;/&nbsp;шт</div>
				<div class="product__cost-all">{{parseFloat((el.price * el.qty).toFixed(2))}}&nbsp;<i class="rub">a</i></div>
			</div>
			<div class="product__cell product__cost">
				<span class="js-benefit offer" style='font-size: 10px'v-if='el.product.offer'>{{el.product.offer}}%</span>
			</div>
			<div class="product__cell product__btn">
				<!-- <div class="product__btn-inner"><svg><use xlink:href="#circle-cross"></use></svg></div> -->
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
			order() {
				return this.$store.getters.order
			},
			orderPrice() {
				let orderPrice = 0;
				if (this.$store.getters.order.products.elements.length)
					this.$store.getters.order.products.elements.forEach(key => {
						orderPrice += parseFloat((key.price * key.qty).toFixed(2))
					})
				return orderPrice
			}
		}
	}
</script>