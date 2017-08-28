<template>
	<section class="popup popup__category" id="popup__select_shop">

	<div class="popup__hdr" v-if='!auttError'>Торговая точка</div>

	<div class="popup__category-form">
		<v-select  :on-change="selectShop" :value.sync="selected" :options="shopsInSelect" placeholder="Выберите торговую точку"></v-select>
		<button class="btn" v-on:click="select">Выбрать</button>
	</div>

</section>
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
	},
	mounted: function() {			 
		if (this.$route.fullPath == '/select_shop') {
			$.fancybox.open({
				src   : '#popup__select_shop',
				type  : 'inline',
				modal : true 
			});
		}	 
	},
  }
</script>

