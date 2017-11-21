<!--
	Компонет продукты,
	выводится на странице каталог
-->
<template>
		<section class="catalog__products-holder">
			<div class="catalog__products-scroll jq-scroll" id='prod_fixed'>
				<div class="catalog__products">

					<div class="catalog__nav-open js-nav-open">
							<span>Каталог</span>
							<svg><use xlink:href="#filter"></use></svg>
					</div>

					<!-- Шапка таблицы -->
					<!-- <div class="shop__table" v-if='productList'>

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

						</div> -->

						<!-- Таблица с товарами -->
						<!-- <div class="shop__row js-t-row normal" v-for='product in  productList' v-if='product.search'>

							<div class="shop__cell shop__cell-name">
								<div class="shop__cell-img">
									<img v-if='!product.img_small'src="pic/batle.png" :alt="product.name">
									<img class='real_img'
										v-if='product.img_small'
										:src='product.img_small'
										:alt="product.name"
										@click="showImg(product)">
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
					</div> -->

					<webix-ui :config='table' v-model='productList' v-if='productList && productList.length'/>
			</div>
		</div>
		<!-- Лоадер -->
		<div class='product_loader fixed-loader' v-if='loader'><img src="pic/loading.gif"></div>
		<div class='text-no-category' v-if='!productList && !loader && idActiveCat'>В категории нет товаров</div>
		<div class='text-no-category' v-if='!idActiveCat && !loade'>Выберите категорию</div>
		<ProductImg v-if='showImageWnd && selectedProduct.img_big'></ProductImg>
	</section>
</template>

<script>
	import store      from '../../store/catalog.js'
	import $          from "jquery"
	import conf       from '../../conf/conf.js'
	import ProductImg from './ProductImg.vue'
	import 'webix'
	import 'vue-webix'

	// Эта переменная хранит значение фильтров котроые ввел пользователь
	// Для того чтобы сохранить их значение при выборе другой категории
	var FILTERS_IN_PRODUCT_TABLE = {
		name  : undefined,
		pack  : undefined,
		litr  : undefined,
		price : undefined,
	}

	export default {
		components: {ProductImg},
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
				if (this.$store.getters.productList) {
					this.$store.getters.productList.forEach(key => {
						key.img  = key.img_small ? conf.url.img + 'small/' + key.img_small : 'pic/batle.png';
					})
				}
				return this.$store.getters.productList
			},
			loader() {
				return this.$store.getters.loader
			},
			showImageWnd(){
				return this.$store.getters.showImageWnd
			},
			selectedProduct(){
				return this.$store.getters.selectedProduct
			},
			table(){
				let $this = this;
				return {
					view    : "datatable",
					height  : $(window).height() / 1.38,
					width   : $('.shop__data-body').width(),
					css     : 'table_cart_product',
					footer  : true,
					select  : true,
					rowHeight:75,
					rowLineHeight :25,
					editable:true,
					columns:[
						{
							template  :"<img id='show_image' class='real_img' src='#img#' height='75'>",
							header    : "",
							css       : 'cell_img',
							width     : 75,
							footer    : {content:"countColumn", colspan: 6}
						},
						{
							id        : "name",
							sort      : "string",
							header    : ["Название", {content:"textFilter"}],
							css       : 'product_tbl_row',
							fillspace : true,
							minWidth  : 300,
							format  : function(value) {
								return "<div class='webix_cell_midle' style='text-align: left'><span style='white-space: pre-wrap; font-size: 15px'>"+value+"</span></div>";
							}
						},
						{
							id        : "Pack",
							sort      : "int",
							header    : ["Фасовка", {content:"textFilter", compare:numerCompare}],
							css       : 'product_price_middle',
							width     : 80,
							minWidth  : 250,
						},
						{
							id     : "Litr",
							sort   : "int",
							header : ["Емкость", {content:"textFilter", compare:numerCompare}],
							css    : 'product_price_middle',
							width  : 80,
							format  : function(value) {
								if (value) return Number(value).toLocaleString('ru-RU');
							}
						},
						{
							id     : "Price",
							sort   : priceSort,
							header : ["Цена <i class='rub'>a</i>&nbsp;/&nbsp;шт ", {content:"textFilter", compare:numerCompare}],
							css    : 'product_price_middle',
							width  : 110,
							format  : function(value) {
								if (value) return Number(value).toLocaleString('ru-RU');
							}
						},
						{
							id      : "Qty",
							editor  :"inline-text",
							sort    : "int",
							header  : ["Наличие"],
							css     : 'product_qty_middle',
							width   : 80,
						},
					], on:{
						onAfterLoad: function() {
							filterTable(this)
						},
						onAfterFilter: function(){
							// Устанавливаем фильтры
							FILTERS_IN_PRODUCT_TABLE.name  = this.getFilter("name").value;
							FILTERS_IN_PRODUCT_TABLE.pack  = this.getFilter("pack").value;
							FILTERS_IN_PRODUCT_TABLE.litr  = this.getFilter("litr").value;
							FILTERS_IN_PRODUCT_TABLE.price = this.getFilter("price").value;
						},
						onAfterSelect: function(id, e, node){
							$this.$data.rowId = id;
							// Выбрали товар
							$this.$store.commit('set', {type: 'selectedProduct', items: this.getItem(id)})
						},
						onAfterUnSelect:function(id, e, node){
							$this.$data.rowId = undefined;
							$this.$store.commit('set', {type: 'selectedProduct', items: undefined})
						},
						onItemClick: function(id, e, node) {
							$this.$store.commit('set', {type: 'selectedProduct', items: this.getItem(id)})

							// Показать картинку
							if (e.target.id == 'show_image') {
								$this.$store.commit('set', {type: 'showImageWnd', items: true})
							}
						},
						onDataUpdate: function(id, product){
							$this.$store.commit('set', {type: 'selectedProduct', items: this.getItem(id)})
						},
						onKeyPress: function(code, e) {
							if (e.target.id == 'cartQuantity') {
								// В inpute выставляем максимальное число символов = 4
								inputMaxLength(e.target);
							}

							// По нажатию кнопки Enter показываем картинку
							if (code == 13 && $this.selectedProduct.img_big) {
								$this.$store.commit('set', {type: 'showImageWnd', items: true})
							}
						}
					}
				}
			}
		},
		created: function() {
			this.$store.commit('set', {type: 'productList', items: undefined})
			this.$store.commit('set', {type: 'selectedProduct', items: undefined})

			webix.ui.datafilter.countColumn = webix.extend({
				refresh:function(master, node, value){
				node.firstChild.innerHTML = "Всего наименований: " + master.count();
			}}, webix.ui.datafilter.summColumn);
		},
		mounted: function() {
			fixProdTbl()
		}
	}

	/**
	 * Функция при прокрутке фиксирует таблицу с товарами
	 */
	function fixProdTbl () {
		let tblHeader = document.getElementById('prod_fixed');
	 	window.onscroll = function() {
			if (window.pageYOffset > 100) {
				tblHeader.classList.add('prod_fixed');
			} else {
				tblHeader.classList.remove('prod_fixed');
			}
		};
	}

	// Сортировка по цене
	function priceSort(a,b) {
		a = parseFloat(a.price);
		b = parseFloat(b.price);
		if (a === b) return 0;
		if (a > b)   return 1;
		if (a < b)   return -1;
	}

 	// Поиск по числу
	function numerCompare(value, filter) {
		// Указывает на условие >
		var more = false;
		// Указывает на условие <
		var less = false;

		// Указывает на условие >=
		var moreEq = false;
		// Указывает на условие <=
		var lessEq = false;

		// Удаляем проблы
		filter = filter.replace(/\s/g, '');
		// Меняе запятую на точку
		filter = filter.replace(/,/g, '.');

		if (filter.indexOf('>=') == 0 ) {
			filter = filter.replace(/>=/g, '');
			moreEq = true;
		}

		if (filter.indexOf('<=') == 0 ) {
			filter = filter.replace(/<=/g, '');
			lessEq = true;
		}

		if (filter.indexOf('>') == 0 ) {
			filter = filter.replace(/>/g, '');
			more = true;
		}

		if (filter.indexOf('<') == 0) {
			filter = filter.replace(/</g, '');
			less = true;
		}

	    filter = parseFloat(filter);

	    if (!filter) {
			return true;
		}

		if (moreEq) {
	    	if (value >= filter) {
	    		return true;
	    	} else {
	    		return false;
	    	}
	    }

	    if (lessEq) {
	    	if (value <= filter) {
	    		return true;
	    	} else {
	    		return false;
	    	}
	    }

	    if (less) {
	    	if (value < filter) {
	    		return true;
	    	} else {
	    		return false;
	    	}
	    }

	    if (more) {
	    	if (value > filter) {
	    		return true;
	    	} else {
	    		return false;
	    	}
	    }

    	if (value == filter) {
    		return true;
       	}  else {
       		return false;
       	}
	}

	/**
	 * Сохраняем фильтры при выборе другой категории
	 * @param {table} - объект Таблицы
	 */
	function filterTable(table) {
		table.getFilter("Price").value = FILTERS_IN_PRODUCT_TABLE.price ? FILTERS_IN_PRODUCT_TABLE.price : '';
		table.getFilter("name").value  = FILTERS_IN_PRODUCT_TABLE.name  ? FILTERS_IN_PRODUCT_TABLE.name  : '';
		table.getFilter("Pack").value  = FILTERS_IN_PRODUCT_TABLE.pack  ? FILTERS_IN_PRODUCT_TABLE.pack  : '';
		table.getFilter("Litr").value  = FILTERS_IN_PRODUCT_TABLE.litr  ? FILTERS_IN_PRODUCT_TABLE.litr  : '';

		if (FILTERS_IN_PRODUCT_TABLE.price){
			table.filter(function(obj){
				return numerCompare(obj.Price, FILTERS_IN_PRODUCT_TABLE.price);
			})
		}

		if (FILTERS_IN_PRODUCT_TABLE.pack){
			table.filter(function(obj){
				return numerCompare(obj.Pack, FILTERS_IN_PRODUCT_TABLE.pack);
			})
		}

		if (FILTERS_IN_PRODUCT_TABLE.litr){
			table.filter(function(obj){
				return numerCompare(obj.Litr, FILTERS_IN_PRODUCT_TABLE.litr);
			})
		}

		if (FILTERS_IN_PRODUCT_TABLE.name){
			table.filter(function(obj){
				if (obj.name.toLowerCase().indexOf(FILTERS_IN_PRODUCT_TABLE.name.toLowerCase())!=-1) return true;
			})
		}
	}

</script>