<template>
	<section class="shop__data">
		<div class="shop__data-body" v-if='productList'>
			<ul class="shop__sub-nav">
				<div>
					<li :class="{ active: !selectOffer, accent: selectOffer}"><a v-on:click="offers(false)">Все</a></li>
					<li :class="{ active: selectOffer, accent: !selectOffer}"><a v-on:click="offers(true)">Индивидуальные предложения</a></li>
				</div>
			</ul>

			<div class="shop__table" v-if ='productList'>
				<div class="shop__row shop__table-hdr">
					<div class="shop__cell shop__table-hdr--name"><span>Название</span></div>
					<div class="shop__cell shop__cell-availability"><span>Наличие</span></div>
					<div class="shop__cell ta_c"><span>Cкидка</span></div>
					<div class="shop__cell"><span>Фасовка</span></div>
					<div class="shop__cell"><span>Емкость</span></div>
					<div class="shop__cell shop__cell-price"><span>Цена</span></div>
					<div class="shop__cell shop__cell-order">&nbsp;</div>
				</div>

				<div class="shop__row js-t-row normal" v-for='product in  productList' v-if="product.visible && product.filterPrice && product.filterAlko && product.search && product.filterOffer">
					<div class="shop__cell shop__cell-name">
						<div class="shop__cell-img"><img src="pic/batle.png" alt="product"></div>
						<div class="shop__cell-main">
							<span class="shop__cell-n">{{product.name}}</span>
						</div>
						<div class="js-cost-clone"></div>
						<div class="shop__benefit-mob">
							<div class="shop__benefit-mob-item">
								<span class="shop__benefit-mob-title">Скидка</span>
								<div class="js-benefit-clone"></div>
							</div>
						</div>
					</div>
					<div class="shop__cell shop__cell-availability" v-for='prop in product.properties' v-if="prop.name == 'Qty'">
						<span class='js-availability'>{{prop.value ? 'В наличии' : 'Нет в наличии' }}</span>
					</div>
					<div class="shop__cell shop__cell-benefit">
						<span class="js-benefit offer" v-if='product.offer'>{{product.offer}}%</span>
						<span class="js-benefit" v-if='!product.offer'>нет</span>
					</div>

					<div class="shop__cell shop__cell-a"  v-for='prop in product.properties' v-if="prop.name == 'Pack'">
						<span class="js-a">{{prop.value}}</span>
					</div>

					<div class="shop__cell shop__cell-a"  v-for='prop in product.properties' v-if="prop.name == 'Litr'">
						<span class="js-a">{{prop.value}}</span>
					</div>

					<div class="shop__cell shop__cell-price">
						<span class="js-price">{{Number(parseFloat(product.price).toFixed(2)).toLocaleString('ru-RU')}}&nbsp;<i class="rub">a</i></span>
					</div>
					<div class="shop__cell shop__cell-order">
						<div class="js-order">
							<input type="number" class="input"  min="1" v-model="product.cartQuantity" :class="{ valid_imnput : product.cartQuantity == 0 }">
							<span class="shop__cell-order--txt">шт</span>
							<button v-on:click="addToCart(product)" class='btn__sell' title="Добавить в корзину" :disabled="product.cartQuantity == 0">
								<span>+</span>&nbsp;<svg><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#bag'></use></svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Лоадер -->
		<div class='product_loader fixed-loader'   v-if='loader'><img src="pic/loading.gif"></div>
		<div class='text-no-category'      v-if='!productList && !loader && idActiveCat'>В категории нет товаров</div>
		<div class='text-no-category'      v-if='!idActiveCat && !loader && !productList'>Выберите категорию</div>
		<div class='text-no-category-long' v-if='!isOffers    && selectOffer && !loader'>В данной категории у Вас нет индивидуальных предложений </div>
	</section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'

	export default {
		data() {
			return {
				isOffers : false,
			}
		},
		computed: {
			category() {
				return this.$store.getters.category
			},
			productList() {
				return this.$store.getters.productList
			},
			loader() {
				return this.$store.getters.loader
			},
			selectOffer() {
				// true  - выбрана вкладка "Индивидуальные предложения"
				// false - выбрана вкладка "Все"
				return this.$store.getters.selectOffer
			},
			idActiveCat(){
				return this.$store.getters.idActiveCat
			}
		},
		methods: {
			addToCart(product){
				this.$store.dispatch('addToCart', product)
			},
			offers(showOffer){
				let isOffers = false;
				if(showOffer) {
					// Указываем что вкалда 'Индивидуальные предложения' включена
					this.$store.commit('set', {type: 'selectOffer', items: true})
					// Если у продукта есть скидка, то показываем этот продукт
					this.productList.forEach(function(key){
						if(!key.offer)
							key.filterOffer = false;
						else
							isOffers = true;
					})
				} else {
					// Указываем что вкалда 'Индивидуальные предложения' выключена
					this.$store.commit('set', {type: 'selectOffer', items: false})
					// Показываем все продукты
					this.productList.forEach(function(key){
						key.filterOffer = true;
					})
				}

				this.$data.isOffers = isOffers;
			},
		},
		created: function() {
			// Очищаем список продуктов
			this.$store.commit('set', {type: 'productList', items: undefined})
			// Вкладка Все
			this.$store.commit('set', {type: 'selectOffer', items: false})
		}
	}
</script>
