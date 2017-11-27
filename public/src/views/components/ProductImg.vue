<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper" >
				<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>

				<img class='show_img' :src="selectedProduct.img_main">
			</div>
		</div>
	</transition>
</template>


<script>
  import store from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
  	computed: {
		showImageWnd() {
			return this.$store.getters.showImageWnd
		},
		selectedProduct() {
			if (this.$store.getters.selectedProduct)      return this.$store.getters.selectedProduct;
			if (this.$store.getters.selectedCartProduct)  return this.$store.getters.selectedCartProduct;
			if (this.$store.getters.selectedOrderProduct) return this.$store.getters.selectedOrderProduct;
		},
	},
	methods: {
		close() {
			this.$store.commit('set', {type: 'showImageWnd', items: false})
		}
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
</script>