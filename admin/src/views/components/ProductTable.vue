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
				view   :"datatable",
				height :600,
				width  :800,
				select : true,
				columns:[
					{ id:"name", editor:"text",	sort:"string", header:["<span class='product_tbl_header'>Выбор товара</span>", {content:"textFilter"}], css:'product_tbl_row', fillspace:true},
					{ template:"<div id='in_cat_checbox' class='product_in_this_category_#inThisCat#'></div>", header:"В категории" , width:100},
				], on:{
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
						if (code == 13) {
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
		this.$store.dispatch('getAllProducts')
	}
  }
</script>

