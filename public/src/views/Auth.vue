<template>
	<section>
		<AuthWnd      v-if='!showForgetPswWnd'></AuthWnd>
		<ForgetPswWnd v-if='showForgetPswWnd'></ForgetPswWnd>
	</section>
</template>

<script>

import AuthWnd      from './components/AuthWnd.vue'
import ForgetPswWnd from './components/ForgetPswWnd.vue'
import Store        from '../store/catalog.js'
import $            from 'jquery'

export default {
	name: 'card',
	components: {AuthWnd, ForgetPswWnd},
	store: Store,
	computed: {
		showForgetPswWnd() {
			return this.$store.getters.showForgetPswWnd;
		},
	}
}

</script>