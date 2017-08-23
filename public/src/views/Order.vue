<template>
  <section class="order">
	<div class="order-ls a-order" v-if='order'>
	<div class="a-catalog__hdr">
		<div class="a-catalog__hdr-title">Заказ
			<span class="order-ls__num" v-if='order.num'>{{order.num}}</span>
			<span class="order-ls__num" v-if='!order.num'>Обрабатывается</span>
			<span class="order-ls__status"><span class="status status--accepted">{{order.status.description}}</span></span>
		</div>

		<div class="a-order__balance">
			<div class="a-order__balance-txt">Баланс</div>
			<div class="a-order__balance-sum negative" v-if='order.receivables'>{{order.receivables}}&nbsp;<i class="rub">a</i></div>
			<div class="a-order__balance-sum negative" v-if='!order.receivables'>Обрабатывается</div>
		</div>

	</div>

	<div class="order-ls__container">
		<OrderData></OrderData>
		<OrderProducts></OrderProducts>
	</div>
</div>

  </section>
</template>


<script>

import OrderData     from './components/OrderData.vue'
import OrderProducts from './components/OrderProducts.vue'
import Store         from '../store/catalog.js'
import $             from 'jquery'

export default {
	name: 'order',
	components: {OrderProducts, OrderData},
	store: Store,
	computed: {
		order() {
			if(!this.$store.getters.order)
				document.location = '/#/orders'
			else
				return this.$store.getters.order
		},
	},
}

</script>