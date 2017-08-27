<template>
	<section class="shop__data">
		<ul class="shop__nav">
		   <!--  <li class="active"><a href="#">Элитные напитки</a></li> -->
			<li v-for="category in catalogTree"><a v-on:click="getCategory(category)">{{category.name}}</a></li>
		</ul>

		<div class="shop__data-body">
			<ul class="shop__sub-nav">
				<div v-if='category'>
					<li class="active"><a v-on:click="offers(false)">Все</a></li>
					<li v-for="cat in category.child"><a v-on:click="getCategory(cat)">{{cat.name}}</a></li>
					<li class="accent"><a v-on:click="offers(true)">Индивидуальные предложения</a></li>
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
					<div class="shop__cell ta_c"><span>Ваша скидка</span></div>
					<!-- <div class="shop__cell"><span>Артикул</span></div> -->
					<div class="shop__cell shop__cell-price"><span>Цена</span></div>
					<div class="shop__cell shop__cell-order">&nbsp;</div>
				</div>

				<div class="shop__row js-t-row normal" v-for='product in  productList' v-if="product.visible && product.filterPrice && product.filterAlko && product.search && product.filterOffer">
					<div class="shop__cell shop__cell-name">
						<div class="shop__cell-img"><!-- <a href="#"><img src="pic/products/abrau_brut.png" alt="product"></a> --></div>
						<div class="shop__cell-main">
							<span class="shop__cell-n">{{product.name}}</span>
							<div class="shop__cell-status">&nbsp;</div>
							<div class="js-availability-clone"></div>
						</div>
						<div class="js-cost-clone"></div>
						<div class="shop__benefit-mob">
							<div class="shop__benefit-mob-item">
								<span class="shop__benefit-mob-title">Скидка</span>
								<div class="js-benefit-clone"></div>
							</div>
						</div>
					</div>
					<div class="shop__cell shop__cell-availability"><span class='js-availability'>{{product.properties[7].value ? 'В наличии' : 'Нет в наличии' }}</span></div>
					<div class="shop__cell shop__cell-benefit">
						<span class="js-benefit" v-if='product.offer'>{{product.offer}}%</span>
					</div>
					<!-- <div class="shop__cell shop__cell-a"> -->
						<!-- <span class="js-a">14%</span> -->
					<!-- </div> -->
					<!-- <div class="shop__cell shop__cell-a"><span class="js-a">46798456213456</span></div> -->
					<div class="shop__cell shop__cell-price">
						<span class="js-price">{{product.price}}&nbsp;<i class="rub">a</i></span>
					</div>
					<div class="shop__cell shop__cell-order">
						<div class="js-order">
							<input type="text" class="input"  v-model="product.cartQuantity">
							<span class="shop__cell-order--txt">шт</span>
							<a v-on:click="addToCart(product)" class='btn__sell' title="Добавить в корзину">
								<span>+</span>&nbsp;<svg><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#bag'></use></svg>
							</a>
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
			category() {
				return this.$store.getters.category
			},
			productList() {				 
				return this.$store.getters.productList
			},
		},
		methods: {
			getCategory(category) {
				$('.shop__nav li').removeClass('active');
				$(event.target).parent().addClass('active');
				this.$store.dispatch('selectCategory', category)
				this.$store.dispatch('getProductList', category.id)
			},
			addToCart(product){
				this.$store.dispatch('addToCart', product)
			},
			offers(showOffer){
				if(showOffer) {
					this.productList.forEach(function(key){
						if(!key.offer) {
							key.filterOffer = false;
						}
					})
				} else {
					this.productList.forEach(function(key){						 
						key.filterOffer = true;						 
					})
				}
			},
		},
		created: function() {
			this.$store.dispatch('getCatalogTree')
		}
	}
</script>
