<template>
<section class="shop__filter">
<div>

	<div class="aa-order__filter-item">
		<div class="aa-order__filter-hdr">Стоимость</div>
		</br>
		<vueSlider ref="price" v-bind="priceSlider" v-model="priceSlider.value" @callback="priceFilter"></vueSlider>
	</div>

	<div class="aa-order__filter-item">
		<div class="aa-order__filter-hdr">Крепость</div>
		</br>
		<vueSlider ref="alko" v-bind="alkoSlider" v-model="alkoSlider.value" @callback="alkoFilter"></vueSlider>
		</br>
		</div>
	</div>


	<div class="aa-order__filter-item">
		<div class="aa-order__filter-hdr">Бренд</div>
		<div class="shop__filter-col">
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>Ledlenser</span>
				</label>
			</div>
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>Nitecore</span>
				</label>
			</div>
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>Fenix</span>
				</label>
			</div>
		</div>
		<div class="shop__filter-col">
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>Eagletec</span>
				</label>
			</div>
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>Armitec</span>
				</label>
			</div>
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>Olight</span>
				</label>
			</div>
		</div>

	</div>
	<div class="aa-order__filter-item">
		<div class="aa-order__filter-hdr">Страна</div>

		<div class="aa-order__filter-chb">
			<label>
				<input type="checkbox" class="checkbox">
				<span>Италия</span>
			</label>
		</div>
		<div class="aa-order__filter-chb">
			<label>
				<input type="checkbox" class="checkbox">
				<span>Венгрия</span>
			</label>
		</div>
		<div class="aa-order__filter-chb">
			<label>
				<input type="checkbox" class="checkbox">
				<span>Россия</span>
			</label>
		</div>
	</div>
	<div class="aa-order__filter-item">
		<div class="aa-order__filter-hdr">Особенности</div>

		<div class="aa-order__filter-chb">
			<label>
				<input type="checkbox" class="checkbox">
				<span>Подарочная упаковка</span>
			</label>
		</div>
		<div class="aa-order__filter-chb">
			<label>
				<input type="checkbox" class="checkbox">
				<span>Дизайн бутылки</span>
			</label>
		</div>
		<div class="aa-order__filter-chb">
			<label>
				<input type="checkbox" class="checkbox">
				<span>Бесплатная доставка</span>
			</label>
		</div>
	</div>
	<div class="aa-order__filter-item">
		<div class="shop__filter-hidden">
			<div class="aa-order__filter-hdr">Другое</div>

			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>Lorem.</span>
				</label>
			</div>
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>Lorem ipsum.</span>
				</label>
			</div>
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>Lorem ipsum dolor.</span>
				</label>
			</div>
		</div>
		<div class="shop__filter-show--holder">
			<div class="shop__filter-show js-more-options">Больше параметров</div>
		</div>
		<div class="shop__filter-submit">
			<button class="btn" v-on:click="getProductList">Подробрать</button>
		</div>
	</div>
</div>
</section>
</template>

<script>
	import vueSlider from 'vue-slider-component';

	import store from '../../store/catalog.js'
	import $     from 'jquery'

	export default {
		components: {vueSlider},
		data () {
			return {
				priceSlider: {
					value: [0, 100],
					width: '100%',
					height: 8,
					dotSize: 16,
					min: 0,
					max: 20000,
					disabled: false,
					show: true,
					tooltip: 'always',
					formatter: '₽{value}',
					bgStyle: {
						backgroundColor: '#fff',
						boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
					},
					tooltipStyle: {
						backgroundColor: '#666',
						borderColor: '#666'
					},
					processStyle: {
						backgroundColor: '#999'
					}
				},
				alkoSlider: {
					value: [0, 100],
					width: '100%',
					height: 8,
					dotSize: 16,
					min: 0,
					max: 100,
					disabled: false,
					show: true,
					tooltip: 'always',
					formatter: '%{value}',
					bgStyle: {
						backgroundColor: '#fff',
						boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
					},
					tooltipStyle: {
						backgroundColor: '#666',
						borderColor: '#666'
					},
					processStyle: {
						backgroundColor: '#999'
					}
				}
			}
		},
		computed: {
			filterPrice() {
				return this.$store.getters.filterPrice
			},
			productList() {
				return this.$store.getters.productList
			}
		},
		methods: {
			getProductList() {

			},
			priceFilter(val){
				let minPrice = val[0]
				let maxPrice = val[1]

				this.productList.forEach(function(key) {
					if (key.properties[0].value < minPrice || key.properties[0].value > maxPrice)
						key.filterPrice = false
					else
						key.filterPrice = true
				})
			},
			alkoFilter(val){
				let minAlko = val[0]
				let maxAlko = val[1]

				this.productList.forEach(function(key) {
					if (key.properties[4].value < minAlko || key.properties[4].value > maxAlko)
						key.filterAlko = false
					else
						key.filterAlko = true
				})
			}
		},
		created: function () {

		}
	}

</script>