<template>
  <section class="catalog" id='catalog'>
    <h2>Каталог</h2>
    <Search></Search>
    <NewCategory></NewCategory>
    <CatalogTree></CatalogTree>
    <ProductList></ProductList>
  </section>
</template>

<script>

import Search       from './components/Search.vue'
import NewCategory  from './components/NewCategory.vue'
import CatalogTree  from './components/CatalogTree.vue'
import ProductList  from './components/ProductList.vue'

import Store from '../store/catalog.js'

export default {
	name: 'catalog',
	components: { Search, CatalogTree,  NewCategory, ProductList},
	store: Store
}

</script>
