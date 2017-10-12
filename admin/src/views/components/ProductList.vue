<!--
	Компонет продукты,
	выводится на странице каталог
-->
<template>
		<section class="catalog__products-holder">
			<div class="catalog__products-scroll jq-scroll">
				<div class="catalog__products">

					<div class="catalog__nav-open js-nav-open">
							<span>Каталог</span>
							<svg><use xlink:href="#filter"></use></svg>
					</div>

					<!-- Шапка таблицы -->
					<div class="shop__table" v-if='productList'>

						<div class="shop__row shop__table-hdr">

							<div style='cursor:pointer;'
								class="shop__cell shop__table-hdr--name"
								:class="[sortName == 'name' ? 'activ_sort' : '']"
								@click="sort('name')"><span>Название</span>
								<span v-if ="sortName == 'name'">
									<sup v-if="sortType == 'ASC'" >∧</sup>
									<sup v-if="sortType == 'DESC'">∨</sup>
								</span>
							</div>

							<div style='cursor:pointer;'
								class="shop__cell shop__cell-availability"
								:class="[sortName == 'qty' ? 'activ_sort' : '']"
								@click="sort('qty')"><span>Количесво</span>
								<span  v-if ="sortName == 'qty'">
									<sup v-if="sortType == 'ASC'" >∧</sup>
									<sup v-if="sortType == 'DESC'">∨</sup>
								</span>
							</div>

							<div style='cursor:pointer;'
								class="shop__cell shop__cell-availability"
								:class="[sortName == 'litr' ? 'activ_sort' : '']"
								@click="sort('litr')"><span>Емкость</span>
								<span  v-if ="sortName == 'litr'">
									<sup v-if="sortType == 'ASC'" >∧</sup>
									<sup v-if="sortType == 'DESC'">∨</sup>
								</span>
							</div>

							<div style='cursor:pointer;'
								class="shop__cell shop__cell-availability"
								:class="[sortName == 'pack' ? 'activ_sort' : '']"
								@click="sort('pack')"><span>Фасовка</span>
								<span  v-if ="sortName == 'pack'">
									<sup v-if="sortType == 'ASC'" >∧</sup>
									<sup v-if="sortType == 'DESC'">∨</sup>
								</span>
							</div>

							<div class="shop__cell shop__cell-order">&nbsp;</div>

						</div>

						<!-- Таблица с товарами -->
						<div class="shop__row js-t-row normal" v-for='product in  productList' v-if='product.search'>

							<div class="shop__cell shop__cell-name">
								<div class="shop__cell-img">
									<img v-if='!product.img_small'src="pic/batle.png" :alt="product.name">
									<img  class='real_img' v-if='product.img_small' :src='imgUrl +"small/"+ product.img_small'  :alt="product.name">
								</div>
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
	import conf  from '../../conf/conf.js'

	export default {
		data() {
			return {
				// Название сортировки, в зависимости от названия
				// добавляем класс activ_sort название колонки
				sortName  : undefined,
				// Тип сортировки ASC|DESC
				sortType  : undefined,
				// Url к картинкам
				imgUrl : conf.url.img,
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
				switch(name) {
					case 'name':
						if (this.productList) {
							if (this.$data.sortName == 'name' && this.$data.sortType != 'DESC') {
								this.productList.sort(compareNameDESC);
								this.$data.sortType = 'DESC';
							}
							else {
								this.productList.sort(compareNameASC);
								this.$data.sortType = 'ASC';
							}
						}
						break;
					case 'qty':
						if (this.productList) {
							if (this.$data.sortName == 'qty' && this.$data.sortType != 'DESC') {
								this.productList.sort(compareQtyDESC);
								this.$data.sortType = 'DESC';
							} else {
								this.productList.sort(compareQtyASC);
								this.$data.sortType = 'ASC';
							}
						}
						break;
					case 'litr':
						if (this.productList) {
							if (this.$data.sortName == 'litr' && this.$data.sortType != 'DESC') {
								this.productList.sort(compareLitrDESC);
								this.$data.sortType = 'DESC'
							} else {
								this.productList.sort(compareLitrASC);
								this.$data.sortType = 'ASC';
							}
						}
						break;
					case 'pack':
						if (this.productList) {
							if (this.$data.sortName == 'pack' && this.$data.sortType != 'DESC') {
								this.productList.sort(comparePackDESC);
								this.$data.sortType = 'DESC'
							} else {
								this.productList.sort(comparePackASC);
								this.$data.sortType = 'ASC';
							}
						}
						break;
					default:
						break
				}
				// Указываем по какому пораметру была произведена сортировка
				this.$data.sortName = name;
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


// Функция сортирует товары по имени (ASC)
function compareNameASC(prodA, prodB) {
	return prodA.name.localeCompare(prodB.name);
}

// Функция сортирует товары по имени (DESC)
function compareNameDESC(prodA, prodB) {
	return prodB.name.localeCompare(prodA.name);
}

// Функция сортирует товары количесву (ASC)
function compareQtyASC(prodA, prodB) {
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

// Функция сортирует товары количесву (DESC)
function compareQtyDESC(prodA, prodB) {
	let qtyA, qtyB;

	prodA.properties.forEach(key => {
		if (key.name == 'Qty') qtyA = key.value;
	});

	prodB.properties.forEach(key => {
		if (key.name == 'Qty') qtyB = key.value;
	});

	if (qtyA < qtyB)  return  1;
	if (qtyA == qtyB) return  0;
	if (qtyA > qtyB)  return -1;
}

// Функция сортирует товары по литражу (ASC)
function compareLitrASC(prodA, prodB) {
	let qtyA, qtyB;

	prodA.properties.forEach(key => {
		if (key.name == 'Litr')	qtyA = key.value;
	});

	prodB.properties.forEach(key => {
		if (key.name == 'Litr')	qtyB = key.value;
	});

	if (qtyA < qtyB)  return -1;
	if (qtyA == qtyB) return  0;
	if (qtyA > qtyB)  return  1;
}

// Функция сортирует товары по литражу (DESC)
function compareLitrDESC(prodA, prodB) {
	let qtyA, qtyB;

	prodA.properties.forEach(key => {
		if (key.name == 'Litr')	qtyA = key.value;
	});

	prodB.properties.forEach(key => {
		if (key.name == 'Litr')	qtyB = key.value;
	});

	if (qtyA < qtyB)  return  1;
	if (qtyA == qtyB) return  0;
	if (qtyA > qtyB)  return -1;
}


// Функция сортирует товары по фасовке (ASC)
function comparePackASC(prodA, prodB) {
	let qtyA, qtyB;

	prodA.properties.forEach(key => {
		if (key.name == 'Pack')	qtyA = key.value;
	});

	prodB.properties.forEach(key => {
		if (key.name == 'Pack')	qtyB = key.value;
	});

	if (qtyA < qtyB)  return -1;
	if (qtyA == qtyB) return  0;
	if (qtyA > qtyB)  return  1;
}

// Функция сортирует товары по фасовке (DESC)
function comparePackDESC(prodA, prodB) {
	let qtyA, qtyB;

	prodA.properties.forEach(key => {
		if (key.name == 'Pack')	qtyA = key.value;
	});

	prodB.properties.forEach(key => {
		if (key.name == 'Pack')	qtyB = key.value;
	});

	if (qtyA < qtyB)  return  1;
	if (qtyA == qtyB) return  0;
	if (qtyA > qtyB)  return -1;
}

</script>