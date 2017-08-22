<template>
<section class="order">
    <Search></Search>
    <Orders></Orders>
</section>
</template>


<script>

import Orders        from './components/OrderAll.vue'
import Search        from './components/SearchOrder.vue'
import Store         from '../store/catalog.js'
import $             from 'jquery'

export default {
	name: 'order',
	components: {Orders, Search},
	store: Store,
	computed: {
		order() {
			return this.$store.getters.order
		},
	},
}

</script>