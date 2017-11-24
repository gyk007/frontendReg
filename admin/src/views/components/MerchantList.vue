<!--
	Компонет табица с менеджерами,
	выводится на странице менеджеры
-->
<template>
	 <div class="b-catalog__container">
	 	<webix-ui :config='table' v-model='merchantList' v-if='!loaderMerchantList' />
		<div class='product_loader' v-if='loaderMerchantList'><img src='pic/loading.gif'></div>
	</div>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'
	import 'webix'
 	import 'vue-webix'

	export default {
		computed: {
			merchantList() {
				return this.$store.getters.merchantList
			},
			loaderMerchantList() {
				return this.$store.getters.loaderMerchantList
			},
			table(){
				let $this = this;
				return {
					id      : "ManagerListDt",
					view    : "datatable",
					height  : $(window).height() / 1.4,
					width   : $('.b-catalog__container').width(),
					footer  : true,
					select  : true,
					columns:[
						{
							id        : "email",
							sort      : "string",
							header    : ["Email", {content:"textFilter"}],
							css       : 'product_tbl_row',
							width     : 450,
							footer    : {content:"countColumn", colspan: 3}
						},
						{
							id        : "name",
							sort      : "string",
							header    : ["Имя менеджера", {content:"textFilter"}],
							css       : 'product_tbl_row',
							fillspace : true,
							minWidth  : 250,
						},
						{
							id        : "password",
							sort      : "string",
							header    : ["Пароль", {content:"textFilter"}],
							css       : 'product_tbl_row',
							width     : 350,
							format  : function(value) {
								if (value)
									return 'Установлен'
								else
									return 'Не установлен';
							}
						},
						{
							id        : "phone",
							sort      : "string",
							header    : ["Телефон", {content:"textFilter"}],
							css       : 'product_tbl_row',
							width     : 450,
						},
					], on:{
						onAfterSelect: function(id, e, node){
							$this.selectMerchant(this.getItem(id));
						},
						onItemDblClick:function(id, e, node) {
							$this.selectMerchant(this.getItem(id));
							//$this.$store.commit('set', {type: 'showNetWnd', items: true});
						},
						onKeyPress: function(code, e){
							if (code == 13 || code == 32) {
								$this.$store.commit('set', {type: 'showNetWnd', items: true});
								this.focusEditor();
							}
						}
					}
				}
			}
		},
		methods: {
			selectMerchant(merchant) {
				this.$store.commit('set', {type: 'merchant', items: merchant})
			},
		},
		created: function() {
			webix.ui.datafilter.countColumn = webix.extend({
				refresh:function(master, node, value){
				node.firstChild.innerHTML = "Всего менеджеров: " + master.count();
			}}, webix.ui.datafilter.summColumn);
		},
	}
</script>