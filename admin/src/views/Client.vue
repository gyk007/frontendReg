<template>
<section class="b-catalog">
	<div class="a-catalog__hdr">
        <div class="a-catalog__hdr-title">Клиенты</div>
        <Search></Search>
        <div class="catalog__controls">
			<div class="a-catalog__hdr-controls" v-if='client'>
				<div class="btn btn btn--edit" @click="shopsWnd" v-if='client'>Торговые точки</div>
			</div>

			<div class="a-catalog__hdr-controls" style="margin-right:10px" v-if='client'>
				<div class="btn btn btn--edit" @click="merchantWnd" v-if='client'>Представитель</div>
			</div>
		</div>
    </div>
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
	<ShopsWnd    v-if='showShopsWnd'></ShopsWnd>
	<MerchantWnd v-if='showMerchantWnd'></MerchantWnd>

</section>
</template>

<script>

import ClientList    from './components/ClientList.vue'
import Search        from './components/SearchClient.vue'
import NewClient     from './components/NewClient.vue'
import ShopsWnd      from './components/ShopsWnd.vue'
import MerchantWnd   from './components/MerchantWnd.vue'
import store         from '../store/catalog.js'
import Paginate      from 'vuejs-paginate'
import $             from 'jquery'

export default {
	name: 'users',
	components: {ClientList, NewClient, ShopsWnd, Search, Paginate, MerchantWnd},
	store: store,
	computed: {
		client() {
			return this.$store.getters.client
		},
		clientPageCount() {
			return this.$store.getters.clientPageCount
		},
		searchClient() {
			return this.$store.getters.searchClient
		},
		showShopsWnd() {
			return this.$store.getters.showShopsWnd
		},
		showMerchantWnd() {
			return this.$store.getters.showMerchantWnd
		},
	},
	methods: {
		unselectClient(){
			this.$store.dispatch('selectClient', null)
		},
		clickPage(pageNum){
			this.$store.dispatch('getClientList', pageNum - 1)
		},
		shopsWnd(){
			this.$store.commit('set', {type: 'showShopsWnd', items: true})
		},
		merchantWnd(){
			this.$store.commit('set', {type: 'showMerchantWnd', items: true})
		}
	},
	created: function() {
		this.$store.commit('set', {type: 'clientsList', items: undefined})
		this.$store.commit('set', {type: 'loader',      items: undefined})
		this.$store.dispatch('selectClient', null)
	},
	mounted: function() {
		this.$store.dispatch('getClientList', this.$route.params.page)
	}
}

</script>