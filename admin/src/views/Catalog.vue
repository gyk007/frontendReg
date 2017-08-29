<template>
	<section class="catalog" id='catalog'>
		<div class="a-catalog__hdr">
				<div class="a-catalog__hdr-title">Каталог</div>
				<Search></Search>
				<div class="catalog__controls">
						<!-- <div class="a-catalog__hdr-controls">
								<a data-fancybox data-src="#popup__product" href="javascript:;" class="btn btn--checkout">Добавить товар</a>
						</div> -->
						<div class="a-catalog__hdr-controls">
							<a data-fancybox data-src="#popup__category" href="javascript:;" class="btn btn--pickup" v-on:click="unselectCategoory">Новая категория</a>
						</div>
						<div class="a-catalog__hdr-controls" style="margin-right:10px" v-if="category">
							<a data-fancybox data-src="#popup__delete_category" href="javascript:;" class="btn btn--delete" v-if="!category.child.length && !productList">Удалить</a>
						</div>
						<div class="a-catalog__hdr-controls" style="margin-right:10px" v-if="category">
								<a data-fancybox data-src="#popup__category" href="javascript:;" class="btn btn--edit">Редактировать</a>
						</div>
						<div class="a-catalog__hdr-controls down_category" style="margin-right:10px" v-if="isHidden()">
							<button class="btn btn--edit" title="Переместить категорию внизу" v-on:click="downCategoory(category)" v-if="!category.child.length" >&#8595;</button>
						</div>
						<div class="a-catalog__hdr-controls up_category" style="margin-right:10px" v-if="isHidden()">
							<button class="btn btn--edit" title="Переместить категорию вверх" v-on:click="upCategoory(category)" v-if="!category.child.length">&#8593;</button>
						</div>
						<div class="a-catalog__hdr-controls in_category" style="margin-right:10px" v-if="isHidden()">
							<button class="btn btn--edit" title="Поместить категорию внутрь следующей категории" v-on:click="inCategoory(category)" v-if="!category.child.length && !productList">&#8594;</button>
						</div>
				</div>
		</div>
		<CatalogTree></CatalogTree>
		<ProductList></ProductList>
		<NewCategory></NewCategory>
		<NewProduct></NewProduct>
		<DeleteWnd></DeleteWnd>
		<ProductTable></ProductTable>
	</section>
</template>

<script>

import Search       from './components/Search.vue'
import NewCategory  from './components/NewCategory.vue'
import NewProduct   from './components/NewProduct.vue'
import CatalogTree  from './components/CatalogTree.vue'
import ProductList  from './components/ProductList.vue'
import DeleteWnd    from './components/DeleteCategory.vue'
import ProductTable from './components/ProductTable.vue'
import store        from '../store/catalog.js'
import $            from 'jquery'

export default {
	name: 'catalog',
	components: { Search, CatalogTree,  NewCategory, ProductList, DeleteWnd, NewProduct, ProductTable},
	store: store,
	computed: {
		category() {
			return this.$store.getters.category
		},
		productList() {
			return this.$store.getters.productList
		}
	},
	methods: {
		unselectCategoory(){
			$('.js-catalog-category a').removeClass('active')
			this.$store.dispatch('selectCategory', null)
		},
		upCategoory(category){
			this.$store.dispatch('leftCategory', category.id)
		},
		downCategoory(category){
			this.$store.dispatch('rightCategory', category.id)
		},
		inCategoory(category) {
			this.$store.dispatch('inCategory', category.id)
		},
		isHidden() {
			if ($(window).width() < 1100)
				return false
			if (this.category)
				return true
			return false
		}
	},
	created: function() {
		this.$store.dispatch('selectCategory', null)
	},
	mounted: function() {
		if ($(window).width() < 1200)
			$('.a-catalog__hdr-search').css('width', '280px')
	}
}

</script>
