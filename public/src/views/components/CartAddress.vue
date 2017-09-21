<template>
	<section class="p-card__data">
		<div class="p-card__data-title">Ваши данные</div>

		<div class="p-card__data-form">
			<div class="input-field" v-if='shop'>
				<div class="p-card__data-title"> {{shop.official.name}} </div>
			</div>
			<div class="input-field">
				<input id="personal-card-tel" type="text" class="input" :class="{ valid_in_cart : validate.phone }" v-model='orderData.phone' >
				<label for="personal-card-tel" :class="{active : orderData.phone }">Телефон получателя<span class="accent">*</span></label>
			</div>
			<div class="input-field">
				<input id="personal-card-addr" type="text" class="input" :class="{ valid_in_cart : validate.address }" v-model='orderData.address'>
				<label for="personal-card-addr" :class="{active : orderData.address }">Адрес доставки<span class="accent">*</span></label>
			</div>
			<div class="input-field">
				<input id="personal-card-name" type="text" class="input" :class="{ valid_in_cart : validate.name}" v-model='orderData.name'>
				<label for="personal-card-name" :class="{active : orderData.name }">Имя получателя<span class="accent">*</span></label>
			</div>
			<div class="input-field">
				<input id="personal-card-email" type="email" class="input" :class="{ valid_in_cart : validate.email }" v-model='orderData.email'>
				<label for="personal-card-email" :class="{active : orderData.email }">Эл.почта<span class="accent">*</span></label>
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
    			validate : {
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
			user() {
				return this.$store.getters.user
			},
			orderData() {
				let orderData = {
					name   : this.$store.getters.user  ? this.$store.getters.user.name             : undefined,
	    			phone  : this.$store.getters.user  ? this.$store.getters.user.phone            : undefined,
	    			address: this.$store.getters.shop  ? this.$store.getters.shop.official.address : undefined,
	    			email  : this.$store.getters.user  ? this.$store.getters.user.email            : undefined,
	    			remark : undefined,
	    			idShop : undefined,
				}
				return orderData;
			}
		},
		methods: {
			addOrder(selectedShop) {
				['phone', 'address', 'name', 'email'].forEach(key => {
					this.$data.validate[key]  = false
					this.orderData[key] = this.orderData[key] ? this.orderData[key].trim() : undefined
				})

				if (!this.orderData.phone)
					return this.$data.validate.phone   = true
				if (!this.orderData.address)
					return this.$data.validate.address = true
				if (!this.orderData.name)
					return this.$data.validate.name    = true
				if (!this.orderData.email)
					return this.$data.validate.email   = true

				this.$store.dispatch('addOrder', this.orderData);
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