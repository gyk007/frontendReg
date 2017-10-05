<!--
	Компонент "Окно подтверждения удаления товара из корзины".
-->
<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container">
					<div class="modal__hdr">Удаление товара</div>
					<div><p style="text-align:center">Вы действительно хотите удалить товар из корзины?</p></div>
					</br>
					<div class="btn_delete_wnd_form">
						<button class="btn_delete_wnd_ok" v-on:click="deletProduct" style='background-color: #9fc957;'>Удалить</button>
						<button class="btn_delete_wnd_cancel" v-on:click="close" style='background-color: #f48c42;'>Отмена</button>
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
		selectedCartProduct() {
			return this.$store.getters.selectedCartProduct;
		},
		showDelCartProdWnd() {
			return this.$store.getters.showDelCartProdWnd;
		}
	},
	methods: {
		close(){
			this.$store.commit('set', {type: 'showDelCartProdWnd', items: false})
		},
		deletProduct() {
			this.$store.dispatch('deletProdInCart', this.selectedCartProduct.id)
			this.$store.commit('set', {type: 'showDelCartProdWnd', items: false})
		},
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