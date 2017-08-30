<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper" >
				<div v-if="$route.fullPath != '/select_shop'" class='modal-close' @click="close"><img src="img/close.png" alt="Закрыть"></div>
				<div class="modal-container-select-shop">
					<div class="modal__hdr">Выберите торговую точку</div>
					<v-select  :on-change="selectShop" :value.sync="selected" :options="shopsInSelect" placeholder="Выберите торговую точку"></v-select>
					</br>

					<div v-if="$route.fullPath != '/select_shop'" class='btn_list'>
						<button class=" btn_in_list modal_btn btn" v-on:click="select">Выбрать</button>
						<button class=" btn_in_list modal_btn btn" v-on:click="close">Отмена</button>
						<div class="clear"></div>
					</div>

					<button v-if="$route.fullPath == '/select_shop'" class="modal_btn btn" v-on:click="select">Выбрать</button>
			</div>
		</div>
		</div>
	</transition>
</template>


<script>
  import store   from '../../store/catalog.js'
  import $       from 'jquery'
  import vSelect from "vue-select"

  export default {
  	components: {vSelect},
	data() {
		return {
			selected     : null,
			login        : undefined,
			password     : undefined,
			selectedShop : null,
		}
	},
	computed: {
		shopsInSelect() {
			let shopsInSelect = [];
			if(this.$store.getters.shops)
				this.$store.getters.shops.forEach((key) => {
					let shop = {
						id    : key.id,
						label : key.official.name
					}
					shopsInSelect.push(shop)
				})
			return shopsInSelect
		},
		shops(){
			return this.$store.getters.shops
		},
		shop(){
			return this.$store.getters.shop
		},
		selectShopWnd(){
			return this.$store.getters.selectShopWnd
		}
	},
	methods: {
		selectShop(shop){
			this.$data.selectedShop = shop
		},
		select() {
			if (this.$data.selectedShop)
				this.$store.dispatch('selectShop', this.$data.selectedShop.id)
		},
		close(){
			this.$store.commit('set', {type: 'selectShopWnd', items: false})
		}
	}
  }
</script>

