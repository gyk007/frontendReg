<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">			 
				<div class="modal-container">

					<div class="modal__hdr">Торговая точка</div>					 
					 
					<v-select  :on-change="selectShop" :value.sync="selected" :options="shopsInSelect" placeholder="Выберите торговую точку"></v-select>
					</br>
					<button class="btn" v-on:click="select">Выбрать</button>
				 		 
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
		}
	},
	methods: {
		selectShop(shop){
			this.$data.selectedShop = shop
		},
		select() {
			if (this.$data.selectedShop)
				this.$store.dispatch('selectShop', this.$data.selectedShop.id)
		}
	}	 
  }
</script>

