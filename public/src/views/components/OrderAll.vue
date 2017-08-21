<template>
	<section class="order__container">
		<div class="order__table">

			<div class="order__row order__row-hdr">
				<div class="order__cell order__number"><span class="order__row-hdr--title">Номер заказа</span></div>
				<div class="order__cell order__invoice"><span class="order__row-hdr--title js-invoice-title">Транспортная накладная</span></div>
				<div class="order__cell order__representative"><span class="js-representative-title order__row-hdr--title">Торговый представитель</span></div>
				<div class="order__cell order__e"><span class="order__row-hdr--title js-e-title">ЕГАИС</span></div>
				<div class="order__cell order__cost"><span class="order__row-hdr--title">Стоимость</span></div>
				<div class="order__cell order__status"><span class="order__row-hdr--title">Статус</span></div>
			</div>


			<div class="order__row js-t-row">
				<div class="order__cell order__number">
					<div class="js-status-clone"></div>
					<sapn class="order__num">
						<a href="#">#458TFE-897-89</a>
						<div class="js-cost-clone"></div>
					</sapn>
					<span  class="order__date">14 июня, 2017</span>
					<div class="order__invoice-mob">
						<div class="order__invoice-mob--item js-invoice-clone">
							<div class="js-invoice-title-clone"></div>
						</div>
						<div class="order__invoice-mob--item js-e-clone">
							<div class="js-e-title-clone"></div>
						</div>
					</div>
					<div class="js-representative-clone">
						<div class="js-representative-title-clone"></div>
					</div>
				</div>
				<div class="order__cell order__invoice"><span class="order__title js-invoice">ТТН-4678-89-73 (14.05.17)</span></div>
				<div class="order__cell order__representative">
					<sapn class="order__title order__title js-representative">Александр Сергеевич</sapn>
					<span class="order__tel js-representative">+7 (468) 456-86-81</span>
				</div>
				<div class="order__cell order__e"><span class="order__title js-e">AMT-467-86-210</span></div>
				<div class="order__cell order__cost"><span class="js-cost">740 000 <i class="rub">a</i></span></div>
				<div class="order__cell order__status"><span class="js-status"><span class='status status--accepted'>Принят в обработку</span></span></div>
			</div>

		</div>
	</section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'

	export default {
		computed: {
			order() {
				return this.$store.getters.order
			},
			orderPrice() {
				let orderPrice = 0;
				if (this.$store.getters.order.products.elements.length)
					this.$store.getters.order.products.elements.forEach(key => {
						orderPrice += parseFloat((key.price * key.qty).toFixed(2))
					})
				return orderPrice
			}
		}
	}
</script>