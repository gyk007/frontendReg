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
			<div class="a-order__balance-sum negative" v-if='order.debt'>{{order.debt}}&nbsp;<i class="rub">a</i></div>
			<div class="a-order__balance-sum negative" v-if='!order.debt'>Обрабатывается</div>
		</div>

		<div class="a-order__hdr-controls">
			<div class="btn btn btn--edit" style='background-color: #f48c42; color: #FFF' @click="deleteOrder">Удалить заказ</div>
		</div>
	</div>

	<div class="order-ls__container">
		<OrderData></OrderData>
		<OrderProducts></OrderProducts>
	</div>
</div>

	<DeleteOrderWnd v-if='showDeleteOrderWnd'></DeleteOrderWnd>

  </section>
</template>


<script>

import OrderData     from './components/OrderData.vue'
import OrderProducts from './components/OrderProducts.vue'
import DeleteOrderWnd from './components/DeleteOrderWnd.vue'
import Store         from '../store/catalog.js'
import $             from 'jquery'

export default {
	name: 'order',
	components: {OrderProducts, OrderData, DeleteOrderWnd},
	store: Store,
	computed: {
		order() {
			if(!this.$store.getters.order)
				document.location.hash = 'orders'
			else
				return this.$store.getters.order
		},
		showDeleteOrderWnd(){
			return this.$store.getters.showDeleteOrderWnd
		}
	},
	methods: {
		deleteOrder(){
			this.$store.commit('set', {type: 'showDeleteOrderWnd', items: true});
		}
	},
	beforeCreate: function (){
		this.$store.dispatch('getOrder', this.$route.params.id)
	}
}

</script>