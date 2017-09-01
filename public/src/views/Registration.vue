<template>
	<RegWnd></RegWnd>
</div>
</template>

<script>

import RegWnd      from './components/RegWnd.vue'
import Store       from '../store/catalog.js'
import $           from 'jquery'

export default {
	name: 'card',
	components: {RegWnd},
	store: Store,
	beforeCreate: function (){
		this.$store.dispatch('getRegData', this.$route.params.token)
	}
}

</script>