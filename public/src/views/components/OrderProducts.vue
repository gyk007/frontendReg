<template>
<section class="order-ls__product">
<div class="order-ls__product--holder">

	<div class="p-card__products-header">
		<span>Сумма заказа: {{parseFloat(orderPrice).toFixed(2)}} &nbsp;<i class="rub">a</i></span>
	</div>

	<div class="product">

		<div class="product__row js-t-row"  v-for='el in order.products.elements'>
			<div class="product__cell product__name">
				<div class="product__name-img">
					<img v-if='!el.product.img_small'src="pic/batle.png" :alt="el.product.name">
					<img class='real_img'
						v-if='el.product.img_small'
						:src='el.product.img_small'
						:alt="el.product.name"
						@click="showImg(el.product)">
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
<ProductImg v-if='showImageWnd && selectedOrderProduct.img_big'></ProductImg>
</section>
</template>

<script>
	import store      from '../../store/catalog.js'
	import $          from 'jquery'
	import conf       from '../../conf/conf.js'
	import ProductImg from './ProductImg.vue'

	export default {
		components: {ProductImg},
		data() {
			return {
				// Url к картинкам
				imgUrl : conf.url.img,
			}
		},
		computed: {
			order() {
				if ( this.$store.getters.order.products && this.$store.getters.order.products.elements) {
					this.$store.getters.order.products.elements.forEach (key => {
						if (key.product.img_small) {
							key.product.img_small = this.$data.imgUrl + "small/" + key.product.img_small
						}
						if (key.product.img_big) {
							key.product.img_big = this.$data.imgUrl + "big/" + key.product.img_big
						}
					})
				}
				return this.$store.getters.order
			},
			showImageWnd() {
				return this.$store.getters.showImageWnd
			},
			selectedOrderProduct () {
				return this.$store.getters.selectedOrderProduct
			},
			orderPrice() {
				let orderPrice = 0;
				if (this.$store.getters.order.products.elements.length)
					this.$store.getters.order.products.elements.forEach(key => {
						orderPrice += parseFloat((key.price * key.qty).toFixed(2))
					})
				return orderPrice
			}
		},
		methods: {
			showImg(product) {
				this.$store.commit('set', {type: 'selectedOrderProduct', items: product})
				this.$store.commit('set', {type: 'showImageWnd', items: true})
			},
		},
		created: function() {
			// Удаляем выбранный товар
			this.$store.commit('set', {type: 'selectedProduct', items: undefined})
			this.$store.commit('set', {type: 'selectedOrderProduct', items: undefined})
			this.$store.commit('set', {type: 'selectedCartProduct', items: undefined})
		},
	}
</script>
