<template>
<section class="b-catalog">
	<Search></Search>
	<ClientList></ClientList>
	<NewClient></NewClient>
	<DeleteWnd></DeleteWnd>
</section>
</template>

<script>


import ClientList    from './components/ClientList.vue'
import Search        from './components/SearchClient.vue'
import NewClient     from './components/NewClient.vue'
import DeleteWnd     from './components/DeleteClient.vue'
import store         from '../store/catalog.js'
import $             from 'jquery'

export default {
	name: 'users',
	components: {ClientList, NewClient, DeleteWnd, Search},
	store: store,
	computed: {
		client() {
			return this.$store.getters.client
		},
	},
	methods: {
		unselectClient(){
			this.$store.dispatch('selectClient', null)
		},
	},
	created: function() {
		this.$store.dispatch('selectClient', null)
	},
}

</script>