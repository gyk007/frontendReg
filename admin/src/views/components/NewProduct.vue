<template>
	<section class="popup popup__category" id="popup__product">

		<div class="popup__hdr" v-if="!product.name">Добавить продутк</div>
		<div class="popup__hdr" v-if="product.name">{{product.name}}</div>

		<div class="popup__category-form">
			<div class="popup__product-form--holder">
			<label>
				<span style="font-size: 15px">Название Продукта</span>
				<input v-model="product.name" placeholder="" class="input" readonly="readonly">
			</label>
			</div>
			<div class="popup__product-form--holder">
				<label>
					<span style="font-size: 15px" >Описание Продукта</span>
				</label>
				<textarea v-model="product.description" placeholder="" readonly="readonly"></textarea>
			</div>
			<div class="popup__product-form--holder">
				<label>
					<input type="checkbox" class="checkbox" v-model="product.visible" disabled="disabled">
					<span style="font-size: 15px">Показать в публичной части</span>
				</label>
			</div>

			<div class="product_prop_hdr">Параметры</div>
			<div class="popup__product-form--holder_prop holder-third" v-for="prop in product.properties" :class="[prop.name == 'Старна производитель' ? '' : '']">
				<label>
					<span style="font-size: 15px">{{prop.name}}
						<span v-if="prop.name == 'Цена'"     class="product_prop_value"> (&#8381;)</span>
						<span v-if="prop.name == 'Крепость'" class="product_prop_value"> (об. %)</span>
						<span v-if="prop.name == 'Литраж'"   class="product_prop_value"> (л.)</span>
					</span>
				</label>
				<input v-model="prop.value" placeholder="" class="input" readonly="readonly">
			</div>
			<div class='clear'></div>
			<button class="btn" v-on:click="addProduct"  v-if="!product.name">Добавить</button>
			<button class="btn" v-on:click="close" v-if="product.name">Закрыть</button>

		</div>
	</section>
</template>


<script>
  import store from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
	computed: {
		product() {
			return this.$store.getters.product
				? this.$store.getters.product
				: {
					name        : '',
					description : '',
					visible     : false
				}
		},
	},
	methods: {
		addProduct() {
			this.$store.dispatch('selectCategory', null)
			$.fancybox.close()
		},
		close() {
			$.fancybox.close()
		}
	},
  }
</script>

