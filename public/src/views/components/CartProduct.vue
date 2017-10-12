<!--
	Компонет товары в корзине.
-->
<template>
<section class="p-card__products">
<div class="p-card__products--inner">
		<!--
			СТАРАЯ ВЕРСТКА, НЕ УДАЛЯЛ, ЗАМЕНИЛ НА WEBIX
		-->
		<!--
		<div class="product">
				<div class="p-card__products-header">
				<span>Продукция на сумму: {{cartPrice.toLocaleString('ru-RU')}} &nbsp;<i class="rub">a</i></span>
				</div>
			<div class="product__row_header js-t-row" >
				<div class="product__cell product__name">
					<div class="product__name-img">
					</div>
					<div class="product__name-title">
						<span class='product__row_header_text'>Название</span>
					</div>
				</div>

				<div class="product__cell product__quantity">
					<span class='product__row_header_text'>Количесво</span>
				</div>

				<div class="product__cell product__cost">
					<span class='product__row_header_text'>Стоимость</span>
				</div>

				<div class="product__cell product__offer">
					<span class='product__row_header_text'>Скидка</span>
				</div>

				<div class="product__cell product__btn">
					&nbsp;
				</div>
			</div>

		</div>

		<div v-if='cart && cart.products'>
		<div class="product"  v-for='el in cart.products.elements'>

		<div class="product__row js-t-row" >
			<div class="product__cell product__name">
				<div class="product__name-img">
					<img src="pic/batle.png" alt="product">
				</div>
				<div class="product__name-title">
					{{el.product.name}}
				</div>
			</div>

			<div class="product__cell product__quantity">
				<input type="number"  min="1" class="input" :value="el.quantity" @blur ='calculateCartPrice(el)' :class="{ valid_imnput : el.quantity == 0 }">
				<span>шт</span>
			</div>

			<div class="product__cell product__cost">
				<div class="product__cost-item">{{Number(parseFloat(el.product.price).toFixed(2)).toLocaleString('ru-RU')}}&nbsp; <i class="rub">a</i>&nbsp;/&nbsp;шт</div>
				<div class="product__cost-all">{{Number(parseFloat(el.product.price * el.quantity).toFixed(2)).toLocaleString('ru-RU')}}&nbsp;<i class="rub">a</i></div>
			</div>

			<div class="product__cell product__offer">
				<span class="js-benefit offer" style='font-size: 10px'v-if='el.product.offer'>{{el.product.offer}}%</span>
			</div>

			<div class="product__cell product__btn" @click='deletProduct(el.id_product)'>
				<div class="product__btn-inner"><svg><use xlink:href="#circle-cross"></use></svg></div>
			</div>
		</div>


		</div>
		</div> -->

		<!--
			WEBIX
		-->
		<webix-ui  :config='table' v-model='cartProducts' />
		<ProductImg v-if='showImageWnd && selectedCartProduct.img_big'></ProductImg>
	</div>
</section>
</template>

<script>
	import store      from '../../store/catalog.js'
	import $          from 'jquery'
	import conf       from '../../conf/conf.js'
	import ProductImg from './ProductImg.vue'
	import 'webix'
	import 'vue-webix'

	export default {
		components: {ProductImg},
		computed: {
			cart() {
				return this.$store.getters.cart
			},
			showImageWnd() {
				return this.$store.getters.showImageWnd
			},
			selectedCartProduct () {
				return this.$store.getters.selectedCartProduct
			},
			cartProducts() {
				let proucts = [];
				if (this.$store.getters.cart && this.$store.getters.cart.products) {
					this.$store.getters.cart.products.elements.forEach(key => {
						let product       = {};

						product.id        = key.id_product;
						product.img       = key.product.img_small ? conf.url.img + 'small/' +  key.product.img_small : 'pic/batle.png';
						product.img_big   = key.product.img_big ? conf.url.img + 'big/' + key.product.img_big : undefined;
						product.name      = '<div class="webix_cell_midle" style="text-align: left"><span style="white-space: pre-wrap; font-size: 15px">' + key.product.name + '</span></div>';
						product.qty       = key.quantity;
						product.price     = parseFloat(key.product.price).toFixed(2);
						product.allPrice  = parseFloat(key.product.price * key.quantity).toFixed(2);
						product.offer     = key.product.offer ?
											'<div class="webix_cell_midle"><span class="js-benefit offer" style="font-size: 15px">' + key.product.offer + '%</span></div>'
											: '';
						product.litr      = key.product.properties.Litr;
						product.pack      = key.product.properties.Pack;
						proucts.push(product);
					})
				}
				return proucts;
			},
			table(){
				let $this = this;
				return {
					view    : "datatable",
					height  : 610,
					width   : $('.p-card__products').width(),
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
							footer    : {content:"countColumn", colspan: 7}
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
							id      : "qty",
							template:"<input type='number' aria-label='Шт.' name='qty' id='qty' min='1' max='9999' maxlength='4' value='#qty#' class='input table_input cartQty' style='width:60px;'>",
							editor  :"inline-text",
							sort    : "int",
							header  : ["Шт.", {content:"textFilter" , compare:numerCompare}],
							css     : 'product_qty_middle',
							width   : 80,
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
							id     : "allPrice",
							sort   : allPriceSort,
							header : ["Сумма <i class='rub'>a</i>", {content:"textFilter", compare:numerCompare}],
							css    : 'product_price_middle',
							width  : 100,
							format  : function(value) {
								if (value) return Number(value).toLocaleString('ru-RU');
							}
						},
						{
							id     : "offer",
							sort   : "string",
							header : "Скидка",
							css    : 'product_price_middle',
							width  : 90,
						},
						{
							id        : "litr",
							sort      : "string",
							header    : ["Литраж", {content:"textFilter", compare:numerCompare}],
							css    : 'product_price_middle',
							width  : 80,
						},
						{
							id        : "pack",
							sort      : "string",
							header    : ["Фасовка", {content:"textFilter", compare:numerCompare}],
							css    : 'product_price_middle',
							width     : 80,
							minWidth  : 250,
						},
					], on:{
						onAfterSelect: function(id, e, node){
							// Выбрали товар в корзине
							$this.$store.commit('set', {type: 'selectedCartProduct', items: this.getItem(id)})
						},
						onAfterUnSelect:function(id, e, node){
							$this.$store.commit('set', {type: 'selectedCartProduct', items: undefined})
						},
						onDataUpdate: function(id, product){
							$this.calculateCartPrice(product);
						},
						onItemClick: function(id, e, node) {
							$this.$store.commit('set', {type: 'selectedCartProduct', items: this.getItem(id)})
							// Показать картинку
							if (e.target.id == 'show_image') {
								$this.$store.commit('set', {type: 'showImageWnd', items: true})
							}
						},
						onKeyPress: function(code, e) {
							if (e.target.id == 'qty') {
								// В inpute выставляем максимальное число символов = 4
								inputMaxLength(e.target);
							}
							// По нажатию кнопки DEL или Backspase
							// показываем окно удаления товара из корзины.
							if (code == 46) {
								$this.$store.commit('set', {type: 'showDelCartProdWnd', items: true})
							}
						}
					}
				}
			}
		},
		methods: {
			deletProduct(idProduct) {
				this.$store.dispatch('deletProdInCart', idProduct)
			},
			// Функция устанавливает максимальное число символов для Input type="number"
			inputMaxLength(value){
				let maxLength = 4;
				if (value.length > maxLength)  {
					value = value.slice(0, maxLength);
					$(event.target).val(value);
				}
			},
			calculateCartPrice(product) {
				this.$store.dispatch('updateQtyProdInCart', product)
				this.$store.dispatch('calculateCartPrice')
			}
		},
		created: function() {
			this.$store.dispatch('getCart')

			// Удаляем выбранный товар
			this.$store.commit('set', {type: 'selectedProduct', items: undefined})
			this.$store.commit('set', {type: 'selectedOrderProduct', items: undefined})
			this.$store.commit('set', {type: 'selectedCartProduct', items: undefined})

			webix.ui.datafilter.countColumn = webix.extend({
				refresh:function(master, node, value){
				node.firstChild.innerHTML = "Всего наименований: " + master.count();
			}}, webix.ui.datafilter.summColumn);
		},
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

	// Сортировка по сумме
	function allPriceSort(a,b) {
		a = parseFloat(a.allPrice);
		b = parseFloat(b.allPrice);
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

		console.log(lessEq)
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

</script>