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
		<webix-ui :config='table' v-model='cart_products' />
	</div>
</section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'
	import 'webix'
	import 'vue-webix'

	export default {
		data() {
			return {
				selectedProduct : undefined,
			}
		},
		computed: {
			cart() {
				return this.$store.getters.cart
			},
			cart_products() {
				let proucts = [];
				if (this.$store.getters.cart && this.$store.getters.cart.products) {
					this.$store.getters.cart.products.elements.forEach(key => {
						let product       = {};

						product.id        = key.id_product;
						product.img       = key.img ? key.img : 'pic/batle.png';
						product.name      = '<div class="webix_cell_midle" style="text-align: left"><span style="white-space: pre-wrap; font-size: 15px">' + key.product.name + '</span></div>';
						product.qty       = key.quantity;
						product.price     = Number(parseFloat(key.product.price).toFixed(2)).toLocaleString('ru-RU')
						product.allPrice  = Number(parseFloat(key.product.price * key.quantity).toFixed(2)).toLocaleString('ru-RU')
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
					height  : 570,
					width   : $('.p-card__products').width(),
					footer  : true,
					select  : true,
					rowHeight:75,
					rowLineHeight :25,
					editable:true,
					columns:[
						{
							template  :"<div class='webix_cell_midle'><img src='#img#' width='50' height='50'></div>",
							header    : "",
							css       : 'cell_img',
							width     : 50,
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
							template:"<input type='number' aria-label='Шт.' name='qty' id='qty' min='1' max='9999' value='#qty#' class='input table_input' style='width:60px;'>",
							editor  :"inline-text",
							sort    : "int",
							header  : ["Шт.", {content:"textFilter"}],
							css     : 'product_qty_middle',
							width   : 80,
						},
						{
							id     : "price",
							sort   : "string",
							header : ["Цена <i class='rub'>a</i>&nbsp;/&nbsp;шт ", {content:"textFilter"}],
							css    : 'product_price_middle',
							width  : 110,
						},
						{
							id     : "allPrice",
							sort   : "string",
							header : ["Цена <i class='rub'>a</i>", {content:"textFilter"}],
							css    : 'product_price_middle',
							width  : 100,
						},
						{
							id     : "offer",
							sort   : "string",
							header : ["Скидка", {content:"textFilter"}],
							css    : 'product_price_middle',
							width  : 90,
						},
						{
							id        : "litr",
							sort      : "string",
							header    : ["Литраж", {content:"textFilter"}],
							css    : 'product_price_middle',
							width  : 80,
						},
						{
							id        : "pack",
							sort      : "string",
							header    : ["Фасовка", {content:"textFilter"}],
							css    : 'product_price_middle',
							width     : 80,
							minWidth  : 250,
						},
					], on:{
						onAfterSelect: function(id, e, node){
							$this.$data.selectedProduct = this.getItem(id);
						},
						onDataUpdate: function(id, product){
							console.log(product);
							$this.calculateCartPrice(product);
						},
						// onItemDblClick:function(id, e, node) {
						// 	$this.selectNet(this.getItem(id));
						// 	$this.$store.commit('set', {type: 'showNetWnd', items: true});
						// },
						// onKeyPress: function(code, e){
						// 	if (code == 13 || code == 32) {
						// 		$this.$store.commit('set', {type: 'showNetWnd', items: true});
						// 		this.focusEditor();
						// 	}
						// }
					}
				}
			}
		},
		methods: {
			deletProduct(idProduct) {
				this.$store.dispatch('deletProdInCart', idProduct)
			},
			calculateCartPrice(product) {
				this.$store.dispatch('updateQtyProdInCart', product)
				this.$store.dispatch('calculateCartPrice')
			}
		},
		created: function() {
			this.$store.dispatch('getCart')

			webix.ui.datafilter.countColumn = webix.extend({
				refresh:function(master, node, value){
				node.firstChild.innerHTML = "Всего наименований: " + master.count();
			}}, webix.ui.datafilter.summColumn);
		},

	}
</script>