<template>
	<section class="p-card__data">
		<div class="p-card__data-title">Ваши данные</div>

		<div class="p-card__data-form">
			<div class="input-field" v-if='shop'>
				<div class="p-card__data-title"> {{shop.official.name}} </div>
			</div>
			<div class="input-field">
				<input id="personal-card-tel" type="text" class="input" v-model='orderData.phone' >
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
			<button v-if='cartPrice' type="submit" class="btn btn--checkout p-card__data-submit" @click='addOrder'>Оформить</button>
		</div>

	</section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'


	export default {
		data() {
    		return {
	    		orderData  : {
	    			name   : '',
	    			phone  : '',
	    			address: '',
	    			email  : '',
	    			remark : '',
	    			idShop : null
    			},
    			validate  :  {
	    			name   : false,
	    			phone  : false,
	    			address: false,
	    			email  : false,
    			}
    		}
  		},
  		computed: {
			shop() {
				return this.$store.getters.shop;
			},
			cartPrice() {
				return this.$store.getters.cartPrice
			},
		},
		methods: {
			addOrder(selectedShop) {

				this.$store.dispatch('addOrder', this.$data.orderData);
			}
		},
		mounted: function() {
		 	materializeInput();
		},
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