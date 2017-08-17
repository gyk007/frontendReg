<template>
<section class="shop__data">
<ul class="shop__nav">
   <!--  <li class="active"><a href="#">Элитные напитки</a></li> -->
	<li v-for="category in catalogTree" :class="[idActiveCat == category.id ? 'active' : '']" ><a v-on:click="getCategory(category)">{{category.name}}</a></li>
</ul>

<div class="shop__data-body">
	<ul class="shop__sub-nav">
		<div v-if='category'>
			<li  v-for="cat in category.child" :class="[idActiveCat == cat.id ? 'active' : '']" ><a    v-on:click="getProductList(cat)">{{cat.name}}</a></li>
		</div>
	</ul>

	<div class="aa-order__f-btn js-filter-trigger">
		<span>Фильтр</span>
		<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#filter"></use></svg>
	</div>

	<div class="shop__table" >
		<div class="shop__row shop__table-hdr">
			<div class="shop__cell shop__table-hdr--name"><span>Название</span></div>
			<div class="shop__cell shop__cell-availability"><span>Наличие</span></div>
			<div class="shop__cell"><span>Ваша скидка</span></div>
			<div class="shop__cell"><span>Артикул</span></div>
			<div class="shop__cell shop__cell-price"><span>Цена</span></div>

			<div class="shop__cell shop__cell-order">&nbsp;</div>
		</div>



	<div class="shop__row js-t-row normal"   v-for='product in  productList' v-if="product.visible && product.filterPrice && product.filterAlko">

	<div class="shop__cell shop__cell-name">
		<div class="shop__cell-img"><a href="#"><img src="pic/products/abrau_brut.png" alt="product"></a></div>
		<div class="shop__cell-main">
			<span class="shop__cell-n"><a href="#">{{product.name}}</a></span>
			<div class="shop__cell-status">&nbsp;</div>
			<div class="js-availability-clone"></div>
		</div>
		<div class="js-cost-clone"></div>
		<div class="shop__benefit-mob">
			<div class="shop__benefit-mob-item">
				<span class="shop__benefit-mob-title">Скидка</span>
				<div class="js-benefit-clone"></div>
			</div>

			<div class="shop__benefit-mob-item">
				<span class="shop__benefit-mob-title">Артикул</span>
				<div class="js-a-clone"></div>
			</div>


		</div>
	</div>
	<div class="shop__cell shop__cell-availability"><span class='js-availability'>{{product.properties[7].value}}</span></div>
	<div class="shop__cell shop__cell-benefit"><span class="js-benefit">14%</span></div>
	<div class="shop__cell shop__cell-a"><span class="js-a">46798456213456</span></div>
	<div class="shop__cell shop__cell-price"><span class="js-price">{{product.properties[0].value}}&nbsp;<i class="rub">a</i></span></div>
	<div class="shop__cell shop__cell-order">
		<div class="js-order">
			<input type="text" class="input"  v-model="product.cartQuantity">
			<span class="shop__cell-order--txt">шт</span>
			<a v-on:click="addToCart(product)" class='btn__sell'> <span>+</span>&nbsp;<svg><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#bag'></use></svg></a>

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
			catalogTree() {
					return this.$store.getters.catalogTree
				},
			idActive() {
				return this.$store.getters.idActive
			},
			category() {
				return this.$store.getters.category
			},
			productList() {
				this.$store.getters.productList.forEach(function(key){
					key.cartQuantity = 1
				})
				return this.$store.getters.productList
			},
		},
		methods: {
			getCategory(pharentCategory) {
				this.$store.dispatch('selectCategory', pharentCategory)
				this.$store.dispatch('getProductList', pharentCategory.id)
			},
			getProductList(category) {
				this.$store.dispatch('getProductList', category.id)
				console.log(this.productList)
			},
			addToCart(product){
				this.$store.dispatch('addToCart', product)
			}
		},
		created: function() {
			this.$store.dispatch('getCatalogTree')
		}
	}
</script>