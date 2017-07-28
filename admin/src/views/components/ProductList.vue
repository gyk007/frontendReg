<template>
		<section class="catalog__products-holder">
			<div class="catalog__products-scroll jq-scroll">
				<div class="catalog__products">

					<div class="catalog__nav-open js-nav-open">
							<span>Каталог</span>
							<svg><use xlink:href="#filter"></use></svg>
					</div>

				<div class="catalog__products-row js-t-row" v-on:click="getProduct(product)" v-for="product in productList">
						<div class="catalog__products-col catalog__products-name">
								<div class="catalog__products-name--img">
										<a href="#"><img src="pic/products/abrau_brut.png" alt="product"></a>
								</div>
								<span class="catalog__products-name--title"><a href="#">{{product.name}}</a>
								<span class="js-av-clone"></span>
								</span>
						</div>
						<div class="catalog__products-col catalog__products-available"><span class="js-av-catch">Мало в наличии</span></div>
						<div class="catalog__products-col catalog__products-art"><span>Артикул: </span>46798456213456</div>
						<div class="catalog__products-col catalog__products-btn"><a data-fancybox data-src="#popup__product" href="javascript:;" class="btn btn--reject" v-on:click="editProduct(product)">Просмотр</a></div>
				</div>

			</div>
		</div>
	</section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from "jquery"

	export default {
		computed: {
			productList() {
				return this.$store.getters.productList
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
