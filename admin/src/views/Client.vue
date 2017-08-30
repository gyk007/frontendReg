<template>
<section class="b-catalog">
	<Search></Search>
	<ClientList></ClientList>
	<paginate v-if='clientPageCount'
	    :page-count="clientPageCount"
	    :page-range="3"
	    :margin-pages="2"
	    :initial-page="parseInt($route.params.page)"
	    :click-handler="clickPage"
	    :prev-text="'<<'"
	    :next-text="'>>'"
	    :container-class="'pagination'"
	    :page-class="'page-item'"
	    :prev-class="'page-item'"
	    :next-class="'page-item'">
	</paginate>
	<div class='clear'></div>	 
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
import Paginate      from 'vuejs-paginate'
import $             from 'jquery'

export default {
	name: 'users',
	components: {ClientList, NewClient, DeleteWnd, Search, Paginate},
	store: store,	 
	computed: {
		client() {
			return this.$store.getters.client
		},
		clientPageCount() {
			return this.$store.getters.clientPageCount
		},		 
	},
	methods: {
		unselectClient(){
			this.$store.dispatch('selectClient', null)
		},
		clickPage(pageNum){
			this.$store.dispatch('getClientList', pageNum - 1)			 
		}
	},
	created: function() {
		console.log(this.$route.params.page)
		this.$store.commit('set', {type: 'clientsList', items: undefined})
		this.$store.commit('set', {type: 'loader',      items: undefined})
		this.$store.dispatch('selectClient', null)
	},	 
	mounted: function() {
		this.$store.dispatch('getClientList', this.$route.params.page)
	}
}

</script>