<template>
	<section class="popup popup__category" id="popup__product">

	<div class="popup__hdr" v-if="!product.name">Добавить продутк</div>
	<div class="popup__hdr" v-if="product.name">{{product.name}}</div>

	<div class="popup__category-form">
		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px">Название Продукта</span>
			<input v-model="product.name" placeholder="Название Продукта" class="input" disabled>
		</label>
		</div>
		<div class="popup__product-form--holder">
		<label>
			<span style="font-size: 15px" >Описание Продукта</span>
			<textarea v-model="product.description" placeholder="Описание Продукта" disabled></textarea>
		</label>
		</div>
		<div class="popup__product-form--holder">
			<label>
				<input type="checkbox" class="checkbox" v-model="product.visible" disabled>
				<span style="font-size: 15px">Показать в публичной части</span>
			</label>
		</div>

		<div class="product_prop_hdr">Параметры</div>
		<div class="popup__product-form--holder_prop" v-for="prop in product.properties" :class="[prop.name == 'Старна производитель' ? 'big_prop' : '']">
			<label>
				<span style="font-size: 15px">
					<span v-if="prop.name == 'Price'"        class="product_prop_value">Цена (&#8381;)</span>
					<span v-if="prop.name == 'Alko'"         class="product_prop_value"> (об. %)</span>
					<span v-if="prop.name == 'Litr'"         class="product_prop_value">Объем (л.)</span>
					<span v-if="prop.name == 'Pack'"         class="product_prop_value">Количесво в упаковке</span>
					<span v-if="prop.name == 'Brand'"        class="product_prop_value">Бренд</span>
					<span v-if="prop.name == 'Made in'"      class="product_prop_value">Объем (л.)</span>
					<span v-if="prop.name == 'Manufacturer'" class="product_prop_value">Объем (л.)</span>
					<span v-if="prop.name == 'Qty'"          class="product_prop_value">Объем (л.)</span>
				</span>
				<input v-model="prop.value" placeholder="" class="input" disabled>
			</label>






Made in
Manufacturer
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

