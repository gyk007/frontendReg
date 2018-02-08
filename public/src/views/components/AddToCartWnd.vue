<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">

			<div class="modal-wrapper" >

				<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container">

					<div class="popup__product-form--holder">
						<div class="modal__hdr">Добавить в корзину</div>
						<p style="font-size: 15px">В упаковке {{selectedProduct.Pack}} шт.</p>
						<p style="font-size: 15px">минимум 1 максимиу 9999</p>
						<label>
							<input   v-model="selectedProduct.cartQuantity"  placeholder="" class="input" type='number' min="0" max="9999" id='cartQuantity'>
						</label>
					</div>

					<div class="btn_delete_wnd_form">
						<button class="btn_delete_wnd_ok"     v-on:click="addToCart"     style='background-color: #9fc957;'>Добавить</button>
						<button class="btn_delete_wnd_cancel" v-on:click="close"         style='background-color: #f48c42;'>Отмена</button>
					</div>

				</div>

			</div>

		</div>

	</transition>
</template>


<script>
  import store from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
  	computed: {
		showAddToCartWnd() {
			return this.$store.getters.showAddToCartWnd
		},
		selectedProduct() {
			return this.$store.getters.selectedProduct;
		},
	},
	methods: {
		addToCart(){
			this.$store.dispatch('addToCart', this.selectedProduct)
			this.$store.commit('set', {type: 'showAddToCartWnd', items: false})
		},
		close() {
			this.$store.commit('set', {type: 'showAddToCartWnd', items: false})
		}
	},
	beforeCreate:  function() {
		document.onkeyup = undefined;
	},
	mounted: function() {
		// По нажатию кнопки ESC закрываем окно,
		// выполняем метод close()
		let	$this = this;
		document.onkeydown = function (e) {
			e = e || window.event;
			if (e.keyCode === 27) {
				$this.close();
			}

			if (e.keyCode === 13) {
				$this.addToCart($this.selectedProduct);
			}
		}

		document.getElementById("cartQuantity").focus();
	},
  }

</script>