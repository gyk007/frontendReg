<template>
	<section class="popup popup__category" id="popup__products">

	<div class="popup__hdr">Редактор товаров в категории</div>

	<div class="a-catalog__hdr-search" style="margin-left:180px; margin-top: 25px">
	<div class="search" style="margin-bottom: 25px;">
        <input type="text" class="input search__input"placeholder="Введите название" @keyup ='search'>
        <input type="button" class="search__submit">
        <div class="search__icon">
            <svg>
                <use xlink:href="#glass"></use>
            </svg>
        </div>
    </div>
    </div>

	<div class="popup__category-form  prod_table">
		<div class="catalog__products-row js-t-row"  v-for="product in allProducts" v-if='product.search'>
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
				this.$store.getters.allProducts.forEach((key, index) => {
					if (key.link) {
						// Проверяем находится ли продукт в выбранной категории
						key.link.forEach(link => {
							if(link.id_category == this.$store.getters.idActiveCat) {
								// Переменная указывает что данный товар находиться в данной категории
								key.inThisCat = true
							} else {
								key.inThisCat = false
							}
						})
						// Помещаем в начало списка
						if(key.inThisCat) {
							// Удаляем из массива даный продукт
							this.$store.getters.allProducts.splice(index, 1)
							// Помещаем его в начало
							this.$store.getters.allProducts.unshift(key)
						}
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
				this.$store.dispatch('deleteProdInCat', id)
		},
		search() {
			let searchStr = $(event.target).val()

			this.allProducts.forEach(key => {
				if (~key.name.toUpperCase().indexOf(searchStr.toUpperCase())) {
					key.search = true
				} else {
					key.search = false
				}
			})
		},
	},
	created: function() {
		this.$store.dispatch('getAllProducts')
	}
  }
</script>

