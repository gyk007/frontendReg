<template>
		<section class="catalog__products-holder">
			<div class="catalog__products-scroll jq-scroll">
				<div class="catalog__products">

					<div class="catalog__nav-open js-nav-open">
							<span>Каталог</span>
							<svg><use xlink:href="#filter"></use></svg>
					</div>


					<div class="shop__table" v-if='productList'>

						<div class="shop__row shop__table-hdr">
							<div class="shop__cell shop__table-hdr--name"><span>Название</span></div>
							<div class="shop__cell shop__cell-availability"><span>Количесво</span></div>
							<div class="shop__cell shop__cell-order">&nbsp;</div>
						</div>

						<div class="shop__row js-t-row normal" v-for='product in  productList' v-if='product.search'>
							<div class="shop__cell shop__cell-name">
								<div class="shop__cell-img"><img src="pic/batle.png" :alt="product.name"></div>
								<div class="shop__cell-main">
									<span class="shop__cell-n">{{product.name}}</span>
									<div class="js-availability-clone"></div>
								</div>
							</div>
							<div class="shop__cell shop__cell-availability"><span class='js-availability'>{{product.properties[7].value}}</span></div>
							<div class="shop__cell shop__cell-order">
								 <a data-fancybox data-src="#popup__product" href="javascript:;" class="btn btn--reject" v-on:click="editProduct(product)">Просмотр</a>
							</div>
						</div>
					</div>
			</div>
		</div>
		<!-- Лоадер -->
		<div class='product_loader fixed-loader' v-if='loader'><img src="pic/loading.gif"></div>
		<div class='text-no-category' v-if='!productList && !loader && idActiveCat'>В категории нет товаров</div>
		<div class='text-no-category' v-if='!idActiveCat && !loade'>Выберите категорию</div>
	</section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from "jquery"

	export default {
		computed: {
			idActiveCat() {
				return this.$store.getters.idActiveCat
			},
			productList() {
				return this.$store.getters.productList
			},
			loader() {
				return this.$store.getters.loader
			}
		},
		methods: {
			getProduct(product) {
				$(event.target).closest('.js-t-row')
					.addClass('active')
					.siblings()
					.removeClass('active')
				this.$store.dispatch('selectProduct', product)
			},
			deleteProduct(idProduct) {
				console.log(idProduct);
			},
			editProduct(product){
				this.$store.dispatch('selectProduct', product)
			}
		},
		created: function() {
			this.$store.commit('set', {type: 'productList', items: undefined})
		},
		mounted: function() {
			$('.js-nav-open').click(function () {
					$('.catalog__nav').fadeIn(200);
					$('body').css('overflow', 'hidden')
			});
			$('.catalog__nav-close').click(function () {
				$('.catalog__nav').fadeOut(200);
				$('body').css('overflow', 'auto')
			});
		}
	}
</script>
