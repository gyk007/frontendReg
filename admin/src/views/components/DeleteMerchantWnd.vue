<!--
	Компонет табица с клиентами (организации),
	выводится на странице клиенты
-->
<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper" >
				<div class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container-select-shop">
					<div class="modal__hdr">Удалить представителя {{net.net_name}} ?</div>

					<div  class='btn_list'>
						<button class=" btn_in_list modal_btn btn" style='background-color: #f48c42;' v-on:click="deleteMerchant">Удалить</button>
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
		net() {
			return this.$store.getters.net
		},
	},
	methods: {
		deleteMerchant() {
			this.$store.dispatch('deleteMerchant', this.net.id_merchant)
		},
		close(){
			this.$store.commit('set', {type: 'showDeleteMerchanttWnd', items: false})
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