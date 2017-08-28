<template>
	<SelectShopWnd></SelectShopWnd>
</div>
</template>

<script>

import SelectShopWnd from './components/SelectShopWnd.vue'
import Store         from '../store/catalog.js'
import $             from 'jquery'

export default {
	name: 'slect_shop',
	components: {SelectShopWnd},
	store: Store,
	beforeCreate: function() {
		this.$store.dispatch('getUser')
	}
}

</script>