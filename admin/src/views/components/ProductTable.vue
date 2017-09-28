<!--
	Компонет таблица со всеми тварами,
	для добавления товара в категорию,
	отдельное модальное окно
-->
<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
			<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container-products">

					<webix-ui :config='table' v-model='allProducts' />

					</br>
					<button class="modal_btn btn" style="background-color: #f48c42; width: 181px" v-on:click="close" v-if="idActiveCat">Закрыть</button>
					</br>
				</div>
			</div>
		</div>
	</transition>
</template>


<script>
  import store from '../../store/catalog.js'
  import $      from 'jquery'
  import 'webix'
  import 'vue-webix'

  export default {
	data() {
		return {
			selectedProduct : undefined,
		}
	},
	computed: {
		allProducts() {
			if (this.$store.getters.allProducts)
				this.$store.getters.allProducts.forEach((key, index) => {
					if (key.link) {
						// Проверяем находится ли продукт в выбранной категории
						for (let i = 0; i < key.link.length; i++) {
							if(key.link[i].id_category == this.$store.getters.idActiveCat) {
								// Переменная указывает что данный товар находиться в данной категории
								key.inThisCat = true
								break;
							} else {
								key.inThisCat = false
							}
						}
						// Помещаем в начало списка
						if(key.inThisCat) {
							// Удаляем из массива даный продукт
							this.$store.getters.allProducts.splice(index, 1)
							// Помещаем его в начало
							this.$store.getters.allProducts.unshift(key)
						}
					}
				})

			return this.$store.getters.allProducts
		},
		idActiveCat() {
			return this.$store.getters.idActiveCat
		},
		table(){
			let $this = this;
			return {
				view    : "datatable",
				height  : 800,
				width   : 1000,
				footer  : true,
				select        : true,
				scrollX       : false,
				rowLineHeight :25,
				rowHeight     :25 ,
				fixedRowHeight:false,
				columns:[
					{
						id        : "name",
						sort      : "string",
						header    : ["Название товара", {content:"textFilter"}],
						css       : 'product_tbl_row',
						width     : 540,
						footer    : {content:"countColumn", colspan: 2, css: "ta_l"}
					},
					{
						id        : "link",
						format    : value => {
							let str_name = '';
							if (value)
								value.forEach( key => {
									if(key.name_category)
										str_name += key.name_category + '; ';
								});
							return str_name;
						},
						sort      : "string",
						header    : ["Название категории", {content:"textFilter", compare:categoryCompare}],
						css       : 'product_tbl_row',
						fillspace : 340,
						footer    : {content:"countColumn", colspan: 2, css: "ta_l"}
					},
					{
						template : "<div id='in_cat_checbox' class='product_in_this_category_#inThisCat#'></div>",
						header   : "В категории" ,
						width    : 120,
						sort     : sortByInThisCat
					}
				], on:{
					onAfterRender : function(id, e, node){
           				this.adjustRowHeight('link', true);
        			},
					onAfterSelect: function(id, e, node){
						$this.$data.selectedProduct = this.getItem(id);
					},
					onItemDblClick:function(id, e, node) {
						$this.$data.selectedProduct = this.getItem(id);
						$this.addProduct($this.$data.selectedProduct.id, $this.$data.selectedProduct.inThisCat);
						$this.$data.selectedProduct.inThisCat = !$this.$data.selectedProduct.inThisCat;
						this.render();
					},
					onItemClick: function(id, e, node) {
						$this.$data.selectedProduct = this.getItem(id);
						if (e.target.id == 'in_cat_checbox') {
							$this.addProduct($this.$data.selectedProduct.id, $this.$data.selectedProduct.inThisCat);
							$this.$data.selectedProduct.inThisCat = !$this.$data.selectedProduct.inThisCat;
							this.render();
						}

					},
					onKeyPress: function(code, e){
						if (code == 13 || code == 32) {
							$this.addProduct($this.$data.selectedProduct.id, $this.$data.selectedProduct.inThisCat);
							$this.$data.selectedProduct.inThisCat = !$this.$data.selectedProduct.inThisCat;
							this.render();
						}
					}
				}
			}
		}
	},
	methods: {
		addProduct(id, inThisCat) {
			if (inThisCat)
				this.$store.dispatch('deleteProdInCat', id)
			else
				this.$store.dispatch('addProdToCat', id)
		},
		close() {
			this.$store.dispatch('getProductList', this.idActiveCat)
			this.$store.commit('set', {type: 'showProductTbl', items: false})
		},
	},
	created: function() {
		if (!this.allProducts) {
			this.$store.dispatch('getAllProducts')
		}

		webix.ui.datafilter.countColumn = webix.extend({
			refresh:function(master, node, value){
			node.firstChild.innerHTML = "Всего товаров: " + master.count();
		}}, webix.ui.datafilter.summColumn);
	},
	mounted: function() {
		// По нажатию кнопки ESC закрываем окно,
		// выполняем метод close()
		let	$this = this;
		document.onkeyup = function (e) {
			e = e || window.event;
			if (e.keyCode === 27) {
				$this.close();
			}
			return false;
		}
	},
}

function categoryCompare(value, filter){
	let str_name = '';
	value.forEach( key => {
		if(key.name_category)
			str_name += key.name_category + '; ';
	})

    str_name = str_name.toString().toLowerCase();
    filter = filter.toString().toLowerCase();
    return str_name.indexOf(filter) === 0;
}

// Сортировка по пораметру входит ли  товар в категорию
function sortByInThisCat (a, b) {
	a = a.inThisCat;
	b = b.inThisCat;
	return (a === b)? 0 : a? -1 : 1;
}

</script>