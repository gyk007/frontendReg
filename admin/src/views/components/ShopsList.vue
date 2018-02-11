<!--
	Компонет табица с магазинами
	выводится на странице Магазины
-->
<template>
	 <div class="b-catalog__container">

	<!-- Страрая таблица для клиентов, решил пока не удалять  -->
		<!-- <div class="b-catalog__table">

			<div class="b-catalog__row js-t-row">
				<div class="b-catalog__cell b-catalog__table-hdr">Название</div>
				<div class="b-catalog__cell b-catalog__table-hdr">Имя менеджера</div>
				<div class="b-catalog__cell b-catalog__table-hdr">Телефон</div>
				<div class="b-catalog__cell b-catalog__table-hdr">ИНН</div>
				<div class="b-catalog__cell b-catalog__table-hdr"></div>
			</div>

			<div class="b-catalog__row js-t-row"
				v-for='net in netList'
				v-on:click="selectNet(net)"
				:class="{ active : (net.id == idSelectedNet) }">
				<div class="b-catalog__cell b-catalog__table-name">
					<div class="b-catalog__table-title--img"><img src="pic/nologo.png" :alt="net.official.name"></div>
					<span>{{net.official.name}}</span>
				</div>

				<div class="b-catalog__cell b-catalog__table-title"   v-if='!net.merchant.name'>-</div>
				<div class="b-catalog__cell b-catalog__table-title"   v-if='net.merchant.name'>{{net.merchant.name}}</div>

				<div class="b-catalog__cell b-catalog__table-history" v-if='!net.merchant.phone'>-</div>
				<div class="b-catalog__cell b-catalog__table-history" v-if='net.merchant.phone'>{{net.merchant.phone}}</div>

				<div class="b-catalog__cell b-catalog__table-history">{{net.official.taxcode}}</div>
				<div class="b-catalog__cell b-catalog__table-history"><a data-fancybox  data-src="#popup__client" href="javascript:;" class="btn btn--edit">Просмотр</a></div>
			</div>
		</div> -->
	<!-- Коец страрой таблицы для клиентов, решил пока не удалять  -->

		<webix-ui :config='table' v-model='shopsList' v-if='!loaderShopsList' />
		<div class='product_loader' v-if='loaderShopsList'><img src='pic/loading.gif'></div>
	</div>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'
	import 'webix'
 	import 'vue-webix'

	export default {
		computed: {
			net() {
				return this.$store.getters.net
			},
			netList() {
				return this.$store.getters.netList
			},
			shopsList() {
				return this.$store.getters.shopsList
			},
			shop() {
				return this.$store.getters.shop
			},
			idSelectedNet() {
				if (this.$store.getters.net){
					return this.$store.getters.net.id
				} else {
					return undefined
				}
			},
			loaderNetList() {
				return this.$store.getters.loaderNetList
			},
			table(){
				let $this = this;
				return {
					id      : "ShopsListDt",
					view    : "datatable",
					height  : $(window).height() / 1.4,
					width   : $('.b-catalog__container').width(),
					footer  : true,
					select  : true,
					columns:[
						{
							id        : "shop_name",
							sort      : "string",
							header    : ["Название", {content:"textFilter"}],
							css       : 'product_tbl_row',
							width     : 250,
							footer    : {content:"countColumn", colspan: 5}
						},
						{
							id      : "merchant_name",
							sort    : "string",
							header  : ["Имя менеджера", {content:"textFilter"}],
							css     : 'product_tbl_row',
							width   : 200,
						},
						{
							id     : "merchant_phone",
							sort   : "string",
							header : ["Телефон", {content:"textFilter"}],
							css    : 'product_tbl_row',
							width  : 200,
						},
						{
							id     : "merchant_email",
							sort   : "string",
							header : ["Email", {content:"textFilter"}],
							css    : 'product_tbl_row',
							width  : 200,
						},
						{
							id     : "shop_taxreasoncode",
							sort   : "string",
							header : ["КПП", {content:"textFilter"}],
							css    : 'product_tbl_row',
							width  : 150,
						},
						{
							id        : "shop_address",
							sort      : "string",
							header    : ["Адрес", {content:"textFilter"}],
							css       : 'product_tbl_row',
							fillspace : true,
							minWidth  : 250,
						},
					], on:{
						onAfterSelect: function(id, e, node){
							$this.selectShop(this.getItem(id));
						},
						onItemDblClick:function(id, e, node) {
							$this.selectShop(this.getItem(id));
							$this.$store.commit('set', {type: 'showShopWnd', items: true});
						},
						onKeyPress: function(code, e){
							if (code == 13 || code == 32) {
								$this.$store.commit('set', {type: 'showShopWnd', items: true});
								this.focusEditor();
							}
						}
					}
				}
			}
		},
		methods: {
			selectShop(shop) {
				this.$store.commit('set', {type: 'shop', items: shop})
			},
		},
		created: function() {
			webix.ui.datafilter.countColumn = webix.extend({
				refresh:function(master, node, value){
				node.firstChild.innerHTML = "Всего магазинов: " + master.count();
			}}, webix.ui.datafilter.summColumn);
		},
	}
</script>
