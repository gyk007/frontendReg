<!--
	Компонет продукты, выводится на странице каталог
-->
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

							<div style='cursor:pointer;'
								class="shop__cell shop__table-hdr--name"
								:class="[sortName == 'name' ? 'activ_sort' : '']"
								@click="sort('name')"><span>Название</span></div>

							<div style='cursor:pointer;'
								class="shop__cell shop__cell-availability"
								:class="[sortName == 'qty' ? 'activ_sort' : '']"
								@click="sort('qty')"><span>Количесво</span></div>

							<div style='cursor:pointer;'
								class="shop__cell shop__cell-availability"
								:class="[sortName == 'litr' ? 'activ_sort' : '']"
								@click="sort('litr')"><span>Емкость</span></div>

							<div style='cursor:pointer;'
								class="shop__cell shop__cell-availability"
								:class="[sortName == 'pack' ? 'activ_sort' : '']"
								@click="sort('pack')"><span>Фасовка</span></div>

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

							<div class="shop__cell shop__cell-availability" v-for='prop in product.properties' v-if="prop.name == 'Qty'">
								<span class='js-availability'>{{prop.value}}</span>
							</div>

							<div class="shop__cell shop__cell-availability" v-for='prop in product.properties' v-if="prop.name == 'Litr'">
								<span class='js-availability'>{{prop.value}}</span>
							</div>

							<div class="shop__cell shop__cell-availability" v-for='prop in product.properties' v-if="prop.name == 'Pack'">
								<span class='js-availability'>{{prop.value}}</span>
							</div>

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
		data() {
			return {
				// Название сортировки, в зависимости от названия
				// добавляем класс activ_sort название колонки
				sortName  : undefined,
			}
		},
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
			},
			sort(name) {
				this.$data.sortName = name;
				switch(name) {
					case 'name':
						if (this.productList) {
							this.productList.sort(compareName);
						}
						break;
					case 'qty':
						if (this.productList) {
							this.productList.sort(compareQty);
						}
						break;
					case 'litr':
						if (this.productList) {
							this.productList.sort(compareLitr);
						}
						break;
					case 'pack':
						if (this.productList) {
							this.productList.sort(comparePack);
						}
						break;
					default:
						break
				}
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


// Функция сортирует товары по имени
function compareName(prodA, prodB) {
	return prodA.name.localeCompare(prodB.name);
}

// Функция сортирует товары количесву
function compareQty(prodA, prodB) {
	let qtyA, qtyB;

	prodA.properties.forEach(key => {
		if (key.name == 'Qty') qtyA = key.value;
	});

	prodB.properties.forEach(key => {
		if (key.name == 'Qty') qtyB = key.value;
	});

	if (qtyA < qtyB)  return -1;
	if (qtyA == qtyB) return  0;
	if (qtyA > qtyB)  return  1;
}

// Функция сортирует товары литражу
function compareLitr(prodA, prodB) {
	let qtyA, qtyB;

	prodA.properties.forEach(key => {
		if (key.name == 'Litr')	qtyA = key.value;
	});

	prodB.properties.forEach(key => {
		if (key.name == 'Litr')	qtyB = key.value;
	});

	if (qtyA < qtyB) return -1;
	if (qtyA == qtyB) return  0;
	if (qtyA > qtyB) return  1;
}

// Функция сортирует товары фасовке
function comparePack(prodA, prodB) {
	let qtyA, qtyB;

	prodA.properties.forEach(key => {
		if (key.name == 'Pack')	qtyA = key.value;
	});

	prodB.properties.forEach(key => {
		if (key.name == 'Pack')	qtyB = key.value;
	});

	if (qtyA < qtyB) return -1;
	if (qtyA == qtyB) return  0;
	if (qtyA > qtyB) return  1;
}

</script>