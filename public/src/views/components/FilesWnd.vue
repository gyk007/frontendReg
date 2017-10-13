<!--
	Компонет таблица со всеми файлами клиента,
	для добавления товара в категорию,
	отдельное модальное окно
-->
<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
			<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container-files">

					<webix-ui :config='table' v-model='files' v-if='files && files.length'/>

					<p class='no_files_text' v-if='!files || !files.length'>У Вас не файлов для скачивания</p>

					</br>
					<button class="modal_btn btn" style="background-color: #f48c42; width: 181px" v-on:click="close">Закрыть</button>
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
  import conf       from '../../conf/conf.js'

  export default {
	computed: {
		showFilesWnd() {
			return this.$store.getters.showFilesWnd
		},
		files() {
			return this.$store.getters.files
		},
		table(){
			let $this = this;
			return {
				view    : "datatable",
				height  : 400,
				width   : 798,
				footer  : true,
				select        : true,
				scrollX       : false,
				rowLineHeight :25,
				rowHeight     :25 ,
				fixedRowHeight:false,
				columns:[
					{
						id        : "name",
						template  : obj => {
							let link = '<a href='+ conf.url.decFile + obj.path + '/' + obj.id + '.' + obj.ext + '>' + obj.name +'</a>'
							return link;
						},
						sort      : "string",
						header    : ["Название файла", {content:"textFilter"}],
						css       : 'product_tbl_row',
						fillspace : true,
						footer    : {content:"countColumn", colspan: 2, css: "ta_l"}
					},
					{
						id     : 'size',
						header : "Размер" ,
						width  : 120,
						sort   : "int",
						format    : value => {
							let size = value;
							size = (size / 1048576).toFixed(2);
							size = size + " MB"
							return size;
						},
					},
				], on:{
					// onAfterRender : function(id, e, node){
     //       				this.adjustRowHeight('link', true);
     //    			},
					// onAfterSelect: function(id, e, node){
					// 	$this.$data.selectedProduct = this.getItem(id);
					// },
					// onItemDblClick:function(id, e, node) {
					// 	$this.$data.selectedProduct = this.getItem(id);
					// 	$this.addProduct($this.$data.selectedProduct.id, $this.$data.selectedProduct.inThisCat);
					// 	$this.$data.selectedProduct.inThisCat = !$this.$data.selectedProduct.inThisCat;
					// 	this.render();
					// },
					// onItemClick: function(id, e, node) {
					// 	$this.$data.selectedProduct = this.getItem(id);
					// 	if (e.target.id == 'in_cat_checbox') {
					// 		$this.addProduct($this.$data.selectedProduct.id, $this.$data.selectedProduct.inThisCat);
					// 		$this.$data.selectedProduct.inThisCat = !$this.$data.selectedProduct.inThisCat;
					// 		this.render();
					// 	}

					// },
					// onKeyPress: function(code, e){
					// 	if (code == 13 || code == 32) {
					// 		$this.addProduct($this.$data.selectedProduct.id, $this.$data.selectedProduct.inThisCat);
					// 		$this.$data.selectedProduct.inThisCat = !$this.$data.selectedProduct.inThisCat;
					// 		this.render();
					// 	}
					// }
				}
			}
		}
	},
	methods: {
		close(){
			this.$store.commit('set', {type: 'showFilesWnd', items: false})
		}
	},
	created: function() {
		webix.ui.datafilter.countColumn = webix.extend({
			refresh:function(master, node, value){
			node.firstChild.innerHTML = "Всего файлов: " + master.count();
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
	beforeCreate: function() {
		this.$store.dispatch('getFiles')
	}
}


</script>