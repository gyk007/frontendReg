<template>
	<RegistrWnd></RegistrWnd>
</div>
</template>

<script>

import RegistrWnd    from './components/RegistrWnd.vue'
import Store         from '../store/catalog.js'
import $             from 'jquery'

export default {
	name: 'registration',
	components: {RegistrWnd},
	store: Store,
}

</script>