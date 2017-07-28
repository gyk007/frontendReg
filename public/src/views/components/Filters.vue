<template>
<section class="shop__filter">
<div>

	<div class="aa-order__filter-item">
		<div class="aa-order__filter-hdr">Стоимость</div>
		</br>
		<vueSlider ref="price" v-bind="slider" v-model="slider.value"></vueSlider>
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
		<div class="aa-order__filter-hdr">Крепость</div>
		<div class="shop__filter-col">
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>5%</span>
				</label>
			</div>
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>7%</span>
				</label>
			</div>
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>16%</span>
				</label>
			</div>
		</div>
		<div class="shop__filter-col">
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>25%</span>
				</label>
			</div>
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>40%</span>
				</label>
			</div>
			<div class="aa-order__filter-chb">
				<label>
					<input type="checkbox" class="checkbox">
					<span>60%</span>
				</label>
			</div>
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
		components: { vueSlider},
		data () {
			return {
				slider: {
					value: [0, 100],
					width: '100%',
					height: 8,
					dotSize: 16,
					min: 0,
					max: 500,
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
				}
			}
		},
		computed: {
			filtersData() {
				return this.$store.getters.catalogTree
			},
		},
		methods: {
			getProductList() {
				console.log(this.$data.slider.value)
			}
		},
		created: function() {
			this.$store.dispatch('getCatalogTree')
		}
	}

</script>