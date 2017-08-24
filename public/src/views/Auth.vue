<template>
	<AuthWnd></AuthWnd>
</div>
</template>

<script>

import AuthWnd     from './components/AuthWnd.vue'
import Store       from '../store/catalog.js'
import $           from 'jquery'

export default {
	name: 'card',
	components: {AuthWnd},
	store: Store,
}

</script>