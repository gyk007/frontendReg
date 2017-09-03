<template>
<section class="statistics__container-item js-fix-h-l">
	<div class="statistics__container-item--inner">
		<div class="statistics__shops">
			<div class="statistics__products-hdr">
				<div class="statistics__products-hdr--cell">
					<div class="statistics__products-hdr--txt">Торговые точки</div>
				   <!--  <div class="notification__hdr-sort">
						<span class="notification__hdr-sort--txt">Сортировать по:</span>
						<span class="notification__hdr-sort--link">количеству заказов</span>
					</div> -->
				</div>
				<div class="statistics__products-hdr--cell">
					<div class="total">{{allPriceAndQty.price.toFixed(2)}}&nbsp;<i class="rub">a</i></div>
					<div class="debt">{{allPriceAndQty.qty}} заказа(ов)</div>
				</div>
			</div>

			<div class="statistics__shops-row js-t-row" v-for='shop in statShop' >
				<div class="statistics__shops-item">
					<span class="promotion__cell-name--wrap">
						<div class="user__img"><img src="pic/nologo.png" alt="logo"></div>
						<span class="promotion__cell-name--txt">{{shop.name}}</span>
					</span>
				</div>
				<div class="statistics__shops-item">{{shop.qty}} заказа(ов) на {{shop.price}}&nbsp;<i class="rub">a</i></div>
			</div>			 

			<!-- <div class="statistics__container-item-ftr">
				<div class="statistics__container-item-ftr--txt">Обновленно 15 минут назад</div>
				<div class="statistics__container-item-ftr--link"><a href="#">Выгрузить отчет в XML</a></div>
			</div> -->
		</div>
	</div>
</section>
</template>

<script>

 
import Store         from '../../store/catalog.js'
import $             from 'jquery'

export default {
	name: 'shopStatistic',	 
	store: Store,
	computed: {
		statShop() {
			return this.$store.getters.statShop
		},	
		allPriceAndQty(){
			let priceAndqty = {qty: 0, price: 0};
			if(this.$store.getters.statShop) {
				this.$store.getters.statShop.forEach(key => {
					priceAndqty.price += parseFloat(key.price); 
					priceAndqty.qty   += parseInt(key.qty);
				})
			}

			return priceAndqty;
		},		 
		loader() {
			return this.$store.getters.loader
		}
	},
}

</script>