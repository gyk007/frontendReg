<template>
<section class="order">
    <Search></Search>
    <div class="order__container">
    	<OrderFilter></OrderFilter>
    	<Orders></Orders>
    </div>
</section>
</template>


<script>

import Orders        from './components/OrderAll.vue'
import OrderFilter   from './components/OrderFilter.vue'
import Search        from './components/SearchOrder.vue'
import Store         from '../store/catalog.js'
import $             from 'jquery'

export default {
	name: 'order',
	components: {Orders, Search, OrderFilter},
	store: Store,
	computed: {
		order() {
			return this.$store.getters.order
		}
	},
}

</script>