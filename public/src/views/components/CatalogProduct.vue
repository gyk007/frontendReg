<!--
	Компонет товары в каталоге.
-->
<template>
	<section class="shop__data">
		<div class="shop__data-body"   :class="{'prod_width' : !productList.length &&  !selectOffer}"  id='prod_fixed'>
			<ul class="shop__sub-nav" style="padding-bottom:20px" v-if='productList.length || selectOffer'>
				<div>
					<li :class="{ active: !selectOffer, accent: selectOffer}"><a v-on:click="offers(false)">Все</a></li>
					<li :class="{ active: selectOffer,  accent: !selectOffer}"><a v-on:click="offers(true)">Индивидуальные предложения</a></li>
				</div>
			</ul>

				<!--
					СТАРАЯ ВЕРСТКА, НЕ УДАЛЯЛ, ЗАМЕНИЛ НА WEBIX
				-->
				<!-- <div class="shop__table" v-if ='productList'>
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
								<input
									type="number"
									class="input"
									min="1"
									maxlength='4'
									max="9999"
									v-model    = "product.cartQuantity"
									v-on:keyup ='inputMaxLength(product.cartQuantity)'
									:class="{ valid_imnput : product.cartQuantity == 0 }">
								<span class="shop__cell-order--txt">шт</span>
								<button
									v-on:click="addToCart(product)"
									class='btn__sell'
									title="Добавить в корзину"
									:disabled="product.cartQuantity == 0"
									:class="{ btn_in_cart : product.inCart}">
									<span>+</span>&nbsp;<svg><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#bag'></use></svg>
								</button>
							</div>
						</div>
					</div>
				</div> -->

				<webix-ui :config='table' v-model='productList' v-if='productList.length'/>
		</div>
		<!-- Лоадер -->
		<div class='product_loader fixed-loader'   v-if='loader'><img src="pic/loading.gif"></div>
		<div class='text-no-category'      v-if='!productList && !loader && idActiveCat'>В категории нет товаров</div>
		<div class='text-no-category'      v-if='!idActiveCat && !loader && !productList.length'>Выберите категорию</div>
		<div class='text-no-category-long' v-if='!isOffers    && selectOffer && !loader'>В данной категории у Вас нет индивидуальных предложений </div>
		<ProductImg v-if='showImageWnd && selectedProduct.img_big'></ProductImg>
	</section>
</template>

<script>
	import store      from '../../store/catalog.js'
	import $          from 'jquery'
	import conf       from '../../conf/conf.js'
	import ProductImg from './ProductImg.vue'
	import 'webix'
	import 'vue-webix'


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
				// указывает на вкладку с индивидуальными предложениями
				isOffers : false,
				// id выбранной строки
				rowId    : undefined
			}
		},
		computed: {
			category() {
				return this.$store.getters.category
			},
			showImageWnd() {
				return this.$store.getters.showImageWnd
			},
			selectedProduct () {
				return this.$store.getters.selectedProduct
			},
			productList() {
				let proucts = [];
				// Проверыем есть ли товар в корзине
				if (this.$store.getters.productList) {
					this.$store.getters.productList.forEach(prod => {
						let product = {};

						product.id    = prod.id;
						product.name  = '<div class="webix_cell_midle" style="text-align: left"><span style="white-space: pre-wrap; font-size: 15px">' + prod.name + '</span></div>';

						product.img     = prod.img_small ? conf.url.img + 'small/' + prod.img_small : 'pic/batle.png';
						product.img_big = prod.img_big ? conf.url.img + 'big/' + prod.img_big : undefined;
						product.price   = parseFloat(prod.price).toFixed(2);
						product.offer   = prod.offer ?
										'<div class="webix_cell_midle"><span class="js-benefit offer" style="font-size: 15px">' + prod.offer + '%</span></div>'
										: '';

						// Свойсвта товара
						prod.properties.forEach(prop => {
							if (prop.name == 'Litr') product.litr = parseFloat(prop.value).toFixed(2);
							if (prop.name == 'Qty')  product.qty  = prop.value;
							if (prop.name == 'Pack') product.pack = prop.value;
						})

						// Количество товара которое нужно добавить в корзину
						product.cartQuantity = 1;
						// Указывает находится ли товар в корзине
						product.inCart = false;
						if (this.$store.getters.cart && this.$store.getters.cart.products) {
							this.$store.getters.cart.products.elements.forEach(podInCart => {
								if (prod.id === podInCart.id_product) {
									// Количество товара в корзине
									product.inCart = true;
								}
							});
						}

						// Фильтры
						if (prod.visible
							&& prod.filterPrice
							&& prod.filterAlko
							&& prod.search
							&& prod.filterOffer) {
							proucts.push(product);
						}

					});
				}

				// Функция фиксирует таблицу с товарами
				fixProdTbl(proucts.length);

				return proucts;
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
							footer    : {content:"countColumn", colspan: 9}
						},
						{
							id        : "name",
							sort      : "string",
							header    : ["Название", {content:"textFilter"}],
							css       : 'product_tbl_row',
							fillspace : true,
							minWidth  : 300,
						},
						{
							id     : "offer",
							sort   : "string",
							header : "Скидка",
							css    : 'product_price_middle',
							width  : 90,
						},
						{
							id        : "pack",
							sort      : "string",
							header    : ["Фасовка", {content:"textFilter", compare:numerCompare}],
							css       : 'product_price_middle',
							width     : 80,
							minWidth  : 250,
						},
						{
							id     : "litr",
							sort   : "string",
							header : ["Емкость", {content:"textFilter", compare:numerCompare}],
							css    : 'product_price_middle',
							width  : 80,
							format  : function(value) {
								if (value) return Number(value).toLocaleString('ru-RU');
							}
						},
						{
							id     : "price",
							sort   : priceSort,
							header : ["Цена <i class='rub'>a</i>&nbsp;/&nbsp;шт ", {content:"textFilter", compare:numerCompare}],
							css    : 'product_price_middle',
							width  : 110,
							format  : function(value) {
								if (value) return Number(value).toLocaleString('ru-RU');
							}
						},
						{
							id      : "qty",
							editor  :"inline-text",
							sort    : "int",
							header  : ["Наличие"],
							css     : 'product_qty_middle',
							width   : 80,
							format  : function(value) {
								if (value)
									return 'В наличии';
								else
									return 'Нет в наличии';
							}
						},
						{
							id      : "cartQuantity",
							template:"<input type='number' aria-label='Шт.' name='cartQuantity' id='cartQuantity' min='1' max='9999'value='#cartQuantity#' class='input table_input cartQty' style='width:60px;'>",
							editor  :"inline-text",
							sort    : "int",
							header  : ["Шт."],
							css     : 'product_qty_middle',
							width   : 80,
						},
						{
							id     : "inCart",
							sort   : "string",
							template:"<div class='webix_cell_midle' id='add_to_cart'><button  id='add_to_cart' class='btn__sell btn_in_cart_#inCart#' title='Добавить в корзину'><span id='add_to_cart'>+</span>&nbsp;<svg id='add_to_cart'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#bag'></use></svg></button></div>",
							header : '',
							css    : 'product_price_middle',
							width  : 100,
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
							// Добавить в корзину
							if (e.target.id == 'add_to_cart') {
								// Так как это работает асинхронно
								// Необходимо усановить таймер
								setTimeout(function(){
									$this.addToCart($this.selectedProduct);
								},200);
							}

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
					if (this.$store.getters.productList) {
						this.$store.getters.productList.forEach(function(key){
							if(!key.offer)
								key.filterOffer = false;
							else
								isOffers = true;
						});
					}
				} else {
					// Указываем что вкалда 'Индивидуальные предложения' выключена
					this.$store.commit('set', {type: 'selectOffer', items: false})
					// Показываем все продукты
					this.$store.getters.productList.forEach(function(key){
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
			// Удаляем выбранный товар
			this.$store.commit('set', {type: 'selectedProduct', items: undefined})
			this.$store.commit('set', {type: 'selectedOrderProduct', items: undefined})
			this.$store.commit('set', {type: 'selectedCartProduct', items: undefined})

			webix.ui.datafilter.countColumn = webix.extend({
				refresh:function(master, node, value){
				node.firstChild.innerHTML = "Всего наименований: " + master.count();
			}}, webix.ui.datafilter.summColumn);
		},
		mounted: function() {
			fixProdTbl(this.productList.length)
		}

	}

	/**
	 * Функция при прокрутке фиксирует таблицу с товарами
	 * @param {isProducts} - количество товара в таблице
	 */
	function fixProdTbl (isProducts) {
		let tblHeader = document.getElementById('prod_fixed');
		if (tblHeader) {
			if (isProducts > 0) {
			 	window.onscroll = function() {
					if (window.pageYOffset > 100) {
						tblHeader.classList.add('prod_fixed');
					} else {
						tblHeader.classList.remove('prod_fixed');
					}
				};
				// Делаем скролл чтобы соытие onscroll отработало
				window.scrollBy(0,-1);
			} else {
				tblHeader.classList.remove('prod_fixed');
				window.onscroll = undefined;
			}
		}
	}

	/**
	 * Функция устанавливает максимальное число символов для Input type="number"
	 * @param {input} - объект Input
	 */
	function inputMaxLength(input) {
		if (input) {
			let maxLength = 3;
			let field = $(input);
			let val    = input.value;

			if(val.length > maxLength) {
				val = val.slice(0, maxLength);
				field.val(val);
			}
		}
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
	 * Функция устанавливает максимальное число символов для Input type="number"
	 * @param {table} - объект Таблицы
	 */
	function filterTable(table) {
		table.getFilter("price").value = FILTERS_IN_PRODUCT_TABLE.price ? FILTERS_IN_PRODUCT_TABLE.price : '';
		table.getFilter("name").value  = FILTERS_IN_PRODUCT_TABLE.name  ? FILTERS_IN_PRODUCT_TABLE.name  : '';
		table.getFilter("pack").value  = FILTERS_IN_PRODUCT_TABLE.pack  ? FILTERS_IN_PRODUCT_TABLE.pack  : '';
		table.getFilter("litr").value  = FILTERS_IN_PRODUCT_TABLE.litr  ? FILTERS_IN_PRODUCT_TABLE.litr  : '';

		if (FILTERS_IN_PRODUCT_TABLE.price){
			table.filter(function(obj){
				return numerCompare(obj.price, FILTERS_IN_PRODUCT_TABLE.price);
			})
		}

		if (FILTERS_IN_PRODUCT_TABLE.pack){
			table.filter(function(obj){
				return numerCompare(obj.pack, FILTERS_IN_PRODUCT_TABLE.pack);
			})
		}

		if (FILTERS_IN_PRODUCT_TABLE.litr){
			table.filter(function(obj){
				return numerCompare(obj.litr, FILTERS_IN_PRODUCT_TABLE.litr);
			})
		}

		if (FILTERS_IN_PRODUCT_TABLE.name){
			table.filter(function(obj){
				if (obj.name.toLowerCase().indexOf(FILTERS_IN_PRODUCT_TABLE.name.toLowerCase())!=-1) return true;
			})
		}
	}

</script>
