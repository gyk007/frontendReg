<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper" >
				<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>

				<img class='show_img' :src="selectedProduct.img_medium">
			</div>
		</div>
	</transition>
</template>


<script>
  import store from '../../store/catalog.js'
  import $     from 'jquery'
  import conf  from '../../conf/conf.js'

  export default {
  	computed: {
		showImageWnd() {
			return this.$store.getters.showImageWnd
		},
		selectedProduct() {
			this.$store.getters.selectedProduct
			this.$store.getters.selectedProduct.img_medium =
				this.$store.getters.selectedProduct.img_medium ?
					conf.url.img + 'medium/' + this.$store.getters.selectedProduct.img_medium :
					'pic/batle.png';

			return this.$store.getters.selectedProduct;
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