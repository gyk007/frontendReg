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
								<a data-fancybox data-src="#popup__delete_category" href="javascript:;" class="btn btn--delete" v-if="!category.child.length">Удалить</a>
						</div>
						<div class="a-catalog__hdr-controls" style="margin-right:10px" v-if="category">
								<a data-fancybox data-src="#popup__category" href="javascript:;" class="btn btn--edit">Редактировать</a>
						</div>
						<div class="a-catalog__hdr-controls" style="margin-right:10px" v-if="category">
								<button class="btn btn--edit" v-on:click="downCategoory(category)" v-if="!category.child.length" >&#8595;</button>
						</div>
						<div class="a-catalog__hdr-controls" style="margin-right:10px" v-if="category">
								<button class="btn btn--edit" v-on:click="upCategoory(category)" v-if="!category.child.length">&#8593;</button>
						</div>
				</div>
		</div>
		<CatalogTree></CatalogTree>
		<ProductList></ProductList>
		<NewCategory></NewCategory>
		<DeleteWnd></DeleteWnd>
	</section>
</template>

<script>

import Search       from './components/Search.vue'
import NewCategory  from './components/NewCategory.vue'
import CatalogTree  from './components/CatalogTree.vue'
import ProductList  from './components/ProductList.vue'
import DeleteWnd    from './components/DeleteWnd.vue'
import Store        from '../store/catalog.js'
import $            from 'jquery'

export default {
	name: 'catalog',
	components: { Search, CatalogTree,  NewCategory, ProductList, DeleteWnd},
	store: Store,
	computed: {
		category() {
				return this.$store.getters.category
			},
	},
	methods: {
		unselectCategoory(){
			$('.js-catalog-category a').removeClass('active')
			this.$store.dispatch('selectCategory', null)
		},
		upCategoory(category){
		 // $('.js-catalog-category a').removeClass('active')
			this.$store.dispatch('leftCategory', category.id)
		},
		downCategoory(category){
			$('.js-catalog-category a').removeClass('active')
			this.$store.dispatch('rightCategory', category.id)
		},
	},
	created: function() {
		this.$store.dispatch('selectCategory', null)
	}
}

</script>
