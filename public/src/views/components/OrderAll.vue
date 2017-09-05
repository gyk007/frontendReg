<template>

<section class="aa-order__result">
	<div class="aa-order__result-inner">

		<div class="order__table">

			<div class="order__row order__row-hdr">
				<div class="order__cell order__number"><span class="order__row-hdr--title">Номер заказа</span></div>
				<div class="order__cell order__invoice">
					<span class="js-representative-title order__row-hdr--title">Торговый представитель</span>
				</div>
				<div class="order__cell order__e"><span class="order__row-hdr--title js-e-title">ЕГАИС</span></div>
				<div class="order__cell order__cost"><span class="order__row-hdr--title">Стоимость</span></div>
				<div class="order__cell order__status"><span class="order__row-hdr--title">Статус</span></div>
			</div>

			<div class="order__row js-t-row" style='cursor: pointer' v-for='order in orders' @click='getOrder(order.id)'>
				<div class="order__cell order__number">
					<div class="js-status-clone"></div>
					<span class="order__num">
						<span v-if='order.num'>{{order.num}}</span>
						<span v-if='!order.num'>В обработке</span>
						<div class="js-cost-clone"></div>
					</span>
					<span  class="order__date">{{order.ctime.toLocaleDateString("ru-RU")}}</span>
					<div class="order__invoice-mob">
						<div class="order__invoice-mob--item js-e-clone">
							<div class="js-e-title-clone"></div>
						</div>
						<div class="order__invoice-mob--item js-invoice-clone">
							<div class="js-invoice-title-clone"></div>
						</div>
					</div>

				</div>
				<div class="order__cell order__invoice">
					<span class="order__title js-e" v-if='order.latch_number'>{{order.latch_number}}</span>
					<span class="order__title js-e" v-if='!order.latch_number'>В обработке</span>
				</div>

				<div class="order__cell order__e">
					<span class="order__title js-e" v-if='order.sales_name'>{{order.sales_name}}</span>
					<span class="order__title js-e" v-if='!order.sales_name'>В обработке</span>
				</div>

				<div class="order__cell order__cost"><span class="js-cost">{{order.price}} <i class="rub">a</i></span></div>
				<div class="order__cell order__status"><span class="js-status"><span class='status status--accepted'>{{order.status.description}}</span></span></div>
			</div>

		</div>

	</div>

	<!-- Лоадер -->
	<div class='product_loader' v-if='loader'><img src="pic/loading.gif"></div>
</section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'

	export default {
		computed: {
			orders() {
				return this.$store.getters.orders
			}
		},
		methods: {
			getOrder(orderId) {
			 	this.$store.dispatch('getOrder', orderId)
			},
		},
		mounted: function() {
			this.$store.dispatch('getOrders', undefined)
		},
	}
</script>
