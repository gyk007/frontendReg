<!--
	Компонет товары в каталоге.
-->
<template>
	<section class="shop__data" v-if='productList'>
		<div class="shop__data-body"   :class="{'prod_width' : !productList.length && !selectOffer}"  id='prod_fixed'>
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

				<webix-ui id='DtWebixProd' :config='table' v-model='productList' v-if='productList.length'/>
		</div>
		<!-- Лоадер -->
		<div class='product_loader fixed-loader'   v-if='loader'><img src="pic/loading.gif"></div>
		<div class='text-no-category'      v-if='!productList && !loader && idActiveCat'>В категории нет товаров</div>
		<div class='text-no-category'      v-if='!idActiveCat && !loader && !productList.length'>Выберите категорию</div>
		<div class='text-no-category-long' v-if='!isOffers    && selectOffer && !loader'>В данной категории у Вас нет индивидуальных предложений </div>
		<ProductImg   v-if='showImageWnd && selectedProduct.img_big'></ProductImg>
		<AddToCartWnd v-if='showAddToCartWnd'></AddToCartWnd>
		<DeletWnd     v-if='showDelCartProdWnd'></DeletWnd>
	</section>
</template>

<script>
	import store        from '../../store/catalog.js'
	import $            from 'jquery'
	import conf         from '../../conf/conf.js'
	import ProductImg   from './ProductImg.vue'
	import AddToCartWnd from './AddToCartWnd.vue'
	import DeletWnd     from './DeleteCartProductWnd.vue'
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

	// Эта переменная хранит значение сортировок котроые ввел пользователь
	// Для того чтобы сохранить их значение при выборе другой категории
	var SORT_IN_PRODUCT_TABLE = {
		by     : undefined, // Название поля дял сортировки
		dir    : undefined, // Направление сортировки
		isSort : false,     // Указывает что уже отсортировали при (нам нужно отсортировать только превый раз при первом рендеринге)
	}

	export default {
		components: {ProductImg, AddToCartWnd, DeletWnd},
		data() {
			return {
				// указывает на вкладку с индивидуальными предложениями
				isOffers : false,
				// id выбранной строки
				rowId    : undefined,
				// сораняем id для выбора строчки после того как добавили товар к корзину
				selectedRowId : undefined,
			}
		},
		computed: {
			category() {
				return this.$store.getters.category
			},
			showImageWnd() {
				return this.$store.getters.showImageWnd
			},
			showDelCartProdWnd() {
				return this.$store.getters.showDelCartProdWnd;
			},
			showAddToCartWnd() {
				return this.$store.getters.showAddToCartWnd
			},
			selectedProduct () {
				return this.$store.getters.selectedProduct
			},
			productList() {
				let proucts = [];
				// Проверыем есть ли товар в корзине
				if (this.$store.getters.productList) {
					this.$store.getters.productList.forEach(prod => {
						if (!prod.img) prod.img           = prod.img_small ? conf.url.img + 'small/' + prod.img_small : 'pic/batle.png';
						if (!prod.img_main) prod.img_main = prod.img_medium ? conf.url.img + 'medium/' + prod.img_medium : undefined;
						prod.Litr  = parseFloat(prod.Litr).toFixed(2);
						prod.price = parseFloat(prod.price).toFixed(2);

						// Количество товара которое в корзине
						prod.cartQuantity = 0;

						// Указывает находится ли товар в корзине
						prod.inCart = false;
						if (this.$store.getters.cart && this.$store.getters.cart.products) {
							this.$store.getters.cart.products.elements.forEach(podInCart => {
								if (prod.id === podInCart.id_product) {
									// Количество товара в корзине
									prod.inCart = true;
									prod.cartQuantity = podInCart.quantity;
								}
							});
						}

						// Фильтры
						if (prod.visible
							&& prod.filterPrice
							&& prod.filterAlko
							&& prod.search
							&& prod.filterOffer) {
							proucts.push(prod);
						}
					});
				}

				// Функция фиксирует таблицу с товарами
				if (window.innerWidth > 1100) {
					fixProdTbl(proucts.length)
				}

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
					id      : 'productDt',
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
							footer    : {content:"countColumn", colspan: 8}
						},
						{
							id        : "name",
							sort      : "string",
							header    : ["Название", {content:"textFilter"}],
							css       : 'product_tbl_row',
							fillspace : true,
							minWidth  : 300,
							format  : function(value) {
								return "<div class='webix_cell_midle' style='text-align: left' id='name_product'><span style='white-space: pre-wrap; font-size: 15px' id='name_product'>"+value+"</span></div>";
							}
						},
						{
							id     : "offer",
							sort   : "string",
							header : "Скидка",
							css    : 'product_price_middle',
							width  : 90,
							format  : function(value) {
								if (value) {
									return '<div class="webix_cell_midle"><span class="js-benefit offer" style="font-size: 15px">' + value + '%</span></div>'
								}
							}
						},
						{
							id        : "Pack",
							sort      : "int",
							header    : ["Фасовка", {content:"textFilter", compare:numerCompare}],
							css       : 'product_price_middle',
							width     : 80,
							minWidth  : 250,
							template :function(obj) {
								return '<span class="filter_link" id="filter_link_pack" title='+obj.Pack+'>' +   obj.Pack + '</span>'
							}
						},
						{
							id       : "Litr",
							sort     : "int",
							header   : ["Емкость", {content:"textFilter", compare:numerCompare}],
							css      : 'product_price_middle',
							width    : 80,
							template :function(obj) {
								return '<span class="filter_link" id="filter_link_litr" title='+obj.Litr+'>' +  Number(obj.Litr).toLocaleString('ru-RU') + '</span>'
							}
						},
						{
							id       : "price",
							sort     : priceSort,
							header   : ["Цена <i class='rub'>a</i>&nbsp;/&nbsp;шт ", {content:"textFilter", compare:numerCompare}],
							css      : 'product_price_middle',
							width    : 110,
							template :function(obj) {
								return '<span class="filter_link" id="filter_link_price" title='+obj.price+'>' +  Number(obj.price).toLocaleString('ru-RU') + '</span>'
							}
						},
						{
							id      : "Qty",
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
							editor  :"inline-text",
							sort    : "int",
							header  : "В Корзине",
							css     : 'product_qty_middle',
							width   : 100,
						},
						{
							id     : "inCart",
							sort   : inCartSort,
							template:"<div class='webix_cell_midle' id='add_to_cart_#inCart#'><button  id='add_to_cart_#inCart#' class='btn__sell btn_in_cart_#inCart#' title='Добавить в корзину'><span id='add_to_cart_#inCart#'>+</span>&nbsp;<svg id='add_to_cart_#inCart#'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#bag'></use></svg></button></div>",
							header : '',
							css    : 'product_price_middle',
							width  : 100,
						},

					], on:{
						onAfterLoad: function() {
							filterTable(this);
							this.filterByAll();
							if($this.$data.selectedRowId) {
								this.eachRow( function (row){
							        if (this.getItem(row).id == $this.$data.selectedRowId.id) {
							        	this.select($this.$data.selectedRowId.id);
							        }
								})
							}
						},
						onAfterRender: function() {
							if (SORT_IN_PRODUCT_TABLE.by && !SORT_IN_PRODUCT_TABLE.isSort) {
								// Указываем что отсортировали
								SORT_IN_PRODUCT_TABLE.isSort = true;
								this.sort(SORT_IN_PRODUCT_TABLE.by, SORT_IN_PRODUCT_TABLE.dir);
							};
						},
						onAfterFilter: function(){
							// Устанавливаем фильтры
							FILTERS_IN_PRODUCT_TABLE.name  = this.getFilter("name").value;
							FILTERS_IN_PRODUCT_TABLE.pack  = this.getFilter("Pack").value;
							FILTERS_IN_PRODUCT_TABLE.litr  = this.getFilter("Litr").value;
							FILTERS_IN_PRODUCT_TABLE.price = this.getFilter("price").value;
						},
						onAfterSelect: function(id, e, node){

							$this.$data.rowId = id;
							// Выбрали товар
							$this.$store.commit('set', {type: 'selectedProduct', items: this.getItem(id)})
						},
						onAfterUnSelect:function(id, e, node){
							$this.$data.selectedRowId = $this.$data.rowId;
							$this.$data.rowId = undefined;
							$this.$store.commit('set', {type: 'selectedProduct', items: undefined})
						},
						onItemClick: function(id, e, node) {
							$this.$store.commit('set', {type: 'selectedProduct', items: this.getItem(id)});
							if (e.target.id == 'add_to_cart_true') {
								$this.deleteFromCart();
							}

							if (e.target.id == 'add_to_cart_false') {
								$this.addToCart($this.selectedProduct);
							}

							// Показать картинку
							if (e.target.id == 'show_image') {
								$this.$store.commit('set', {type: 'showImageWnd', items: true})
							}

							// Фильтры
							if (e.target.id == 'filter_link_pack') {
								FILTERS_IN_PRODUCT_TABLE.pack  = e.target.title;
								filterTable(this)
								this.filterByAll();
							}
							if (e.target.id == 'filter_link_litr') {
								FILTERS_IN_PRODUCT_TABLE.litr = e.target.title;
								filterTable(this)
								this.filterByAll();
							}
							if (e.target.id == 'filter_link_price') {
								FILTERS_IN_PRODUCT_TABLE.price = e.target.title;
								filterTable(this)
								this.filterByAll();
							}

						},
						onItemDblClick: function(id, e, node) {
							$this.$store.commit('set', {type: 'selectedProduct', items: this.getItem(id)})
							if (e.target.id == 'name_product') {
								$this.addToCart($this.selectedProduct);
							}  else {
								$this.addToCart($this.selectedProduct);
							}
						},
						onDataUpdate: function(id, product){
							$this.$store.commit('set', {type: 'selectedProduct', items: this.getItem(id)})
						},
						onKeyPress: function(code, e) {
							// По нажатию кнопки Enter показываем картинку
							if (code === 13 && $this.selectedProduct) {
								$this.addToCart($this.selectedProduct);
							}

							// По нажатию кнопки DEL или Backspase
							// показываем окно удаления товара из корзины.
							if (code == 46 && $this.selectedProduct && $this.selectedProduct.cartQuantity) {
								$this.deleteFromCart();
							}
						},
						onAfterSort: function(by, dir, as){
     						SORT_IN_PRODUCT_TABLE.dir = dir
     						SORT_IN_PRODUCT_TABLE.by  = by ? by : 'price';
						},
					}
				}
			}
		},
		methods: {
			addToCart(product){
				this.$store.commit('set', {type: 'showAddToCartWnd', items: true});
			},
			deleteFromCart() {
				this.$store.commit('set', {type: 'showDelCartProdWnd', items: true})
			},
			offers(showOffer){
				let isOffers = false;
				if(showOffer) {
					// Указываем что вкалда 'Индивидуальные предложения' включена
					this.$store.commit('set', {type: 'selectOffer', items: true})

					// Если у продукта есть скидка, то показываем этот продукт
					if (this.$store.getters.productList) {
						this.$store.getters.productList.forEach(function(key){
							if(!key.offer) {
								key.filterOffer = false;
							} else {
								isOffers = true;
							}
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
			if (window.innerWidth > 1100) {
				fixProdTbl(this.productList.length)
			}
		},
		updated: function() {
			SORT_IN_PRODUCT_TABLE.isSort = false;
		}
	}

	/**
	 * Функция при прокрутке фиксирует таблицу с товарами
	 * @param {isProducts} - количество товара в таблице
	 */
	function fixProdTbl (isProducts) {
		console.log('FIXED');
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

	// Сортировка по нахождению в корзине
	function inCartSort(a,b) {
		a = a.inCart;
		b = b.inCart;
		console.log(a);
		console.log(b);
		if (a && b) return 0;
		if (a && !b) return 1;
		if (!a && b) return -1;
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
		table.getFilter("price").value = FILTERS_IN_PRODUCT_TABLE.price ? FILTERS_IN_PRODUCT_TABLE.price : '';
		table.getFilter("name").value  = FILTERS_IN_PRODUCT_TABLE.name  ? FILTERS_IN_PRODUCT_TABLE.name  : '';
		table.getFilter("Pack").value  = FILTERS_IN_PRODUCT_TABLE.pack  ? FILTERS_IN_PRODUCT_TABLE.pack  : '';
		table.getFilter("Litr").value  = FILTERS_IN_PRODUCT_TABLE.litr  ? FILTERS_IN_PRODUCT_TABLE.litr  : '';

		if (FILTERS_IN_PRODUCT_TABLE.price){
			table.filter(function(obj){
				return numerCompare(obj.price, FILTERS_IN_PRODUCT_TABLE.price);
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
