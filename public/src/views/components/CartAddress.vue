<template>
	<section class="p-card__data">
		<div class="p-card__data-title">Ваши данные</div>

		<div class="p-card__data-form">
			<div class="input-field">
				<v-select  :on-change="selectShop" :value.sync="selected" :options="shops" placeholder="Выберите торговую точку"></v-select>
			</div>
			<div class="input-field">
				<input id="personal-card-tel" type="text" class="input" v-model='orderData.phone'>
				<label for="personal-card-tel">Телефон получателя<span class="accent">*</span></label>
			</div>
			<div class="input-field">
				<input id="personal-card-addr" type="text" class="input" v-model='orderData.address'>
				<label for="personal-card-addr">Адрес доставки<span class="accent">*</span></label>
			</div>
			<div class="input-field">
				<input id="personal-card-name" type="text" class="input" v-model='orderData.name'>
				<label for="personal-card-name">Имя получателя<span class="accent">*</span></label>
			</div>
			<div class="input-field">
				<input id="personal-card-email" type="email" class="input" v-model='orderData.email'>
				<label for="personal-card-email">Эл.почта<span class="accent">*</span></label>
			</div>

			<div class="p-card__data-form--txt">
				<span>Пожелания по доставке</span>
				<textarea name="personal-card-message"  v-model='orderData.remark'></textarea>
			</div>
			<button type="submit" class="btn btn--checkout p-card__data-submit" @click='addOrder'>Оформить</button>
		</div>

	</section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'
	import vSelect from "vue-select"

	export default {
		components: {vSelect},
		data() {
    		return {
    			selected : null,
	    		orderData  : {
	    			name   : '',
	    			phone  : '',
	    			address: '',
	    			email  : '',
	    			remark : '',
	    			idShop : null
    			}
    		}
  		},
  		computed: {
			shops() {
				let shops = [];
				if(this.$store.getters.shops.length)
					this.$store.getters.shops.forEach((key) => {
						let shop = {
							id    : key.id,
							label : key.official.name
						}
						shops.push(shop)
					})
				return shops
			},
		},
		methods: {
			selectShop(shop){
				this.$data.orderData.idShop = shop.id
			},
			addOrder(selectedShop) {
				this.$store.dispatch('addOrder', this.$data.orderData);
			}
		},
		watch: {
			selectedShop: function (val) {
     			this.$data.selectedShop = val
    		},
		},
		mounted: function() {
		 	materializeInput();
		}
	}

	 //materialize input
	function materializeInput() {
		$('.input-field input').focus(function () {
			$(this).next('label').addClass('active');
		});
		$('.input-field input').blur(function () {
			if( !($(this).val()) ) {
				$(this).next('label').removeClass('active');
			}
		});
		$('.input-field input').each(function () {
			if( ($(this).val()) ) {
				$(this).next('label').addClass('active');
			}
		});
	}

</script>