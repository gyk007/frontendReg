<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper" >
				<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container-select-shop">
					<div class="modal__hdr">Удалить заказ?</div>

					<div  class='btn_list'>
						<button class=" btn_in_list modal_btn btn" style='background-color: #f48c42;' v-on:click="deleteOrder">Удалить</button>
						<button class=" btn_in_list modal_btn btn" v-on:click="close">Отмена</button>
						<div class="clear"></div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>


<script>
  import store   from '../../store/catalog.js'
  import $       from 'jquery'


  export default {
	computed: {
		order() {
			return this.$store.getters.order
		}
	},
	methods: {
		deleteOrder() {
			this.$store.dispatch('deleteOrder', this.order.id)
		},
		close(){
			this.$store.commit('set', {type: 'showDeleteOrderWnd', items: false})
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