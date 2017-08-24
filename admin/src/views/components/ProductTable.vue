<template>
	<section class="popup popup__category" id="popup__products">

	<div class="popup__hdr">Редактор товаров в категории</div>


	<div class="popup__category-form">

		<div class="catalog__products-row js-t-row"   v-for="product in allProducts">
				<div class="catalog__products-col catalog__products-name">
						<span class="catalog__products-name--title">
							{{product.name}}
							<span class="js-av-clone"></span>
						</span>
				</div>
				<div class="catalog__products-col catalog__products-btn">
					<input type="checkbox" class="checkbox" v-if='product.inThisCat' checked @click='addProduct(product.id)'>
					<input type="checkbox" class="checkbox" v-if='!product.inThisCat' @click='addProduct(product.id)'>
				</div>
		</div>

	</div>
</section>
</template>


<script>
  import store from '../../store/catalog.js'
  import $      from 'jquery'

  export default {
	computed: {
		allProducts() {
			if (this.$store.getters.allProducts)
				this.$store.getters.allProducts.forEach(key => {
					if (key.link) {
						key.link.forEach(link => {
							if(link.id_category == this.$store.getters.idActiveCat) {
								key.inThisCat = true
							} else {
								key.inThisCat = false
							}
						})
					}
				})

 			return this.$store.getters.allProducts
 		},
	},
	methods: {
		addProduct(id) {
			if ($(event.target).is(':checked'))
				this.$store.dispatch('addProdToCat', id)
			else
				console.log('dele')
				this.$store.dispatch('deleteProdInCat', id)
		},
	},
	created: function() {
		this.$store.dispatch('getAllProducts')
	}
  }
</script>

