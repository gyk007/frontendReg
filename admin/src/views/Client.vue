<template>
<section>
	<div class="a-catalog__hdr">
        <div class="a-catalog__hdr-title">Клиенты</div>
        <div class="catalog__controls">
			<div class="a-catalog__hdr-controls" v-if='net'>
				<div class="btn btn btn--edit" @click="shopsWnd">Торговые точки</div>
			</div>

			<div class="a-catalog__hdr-controls" style="margin-right:10px" v-if='net'>
				<div class="btn btn btn--edit" @click="merchantWnd">Представитель</div>
			</div>
			<div class="a-catalog__hdr-controls" style="margin-right:10px" v-if='net'>
				<div class="btn btn btn--edit" @click="netWnd">Просмотр</div>
			</div>
		</div>
    </div>
	<NetList></NetList>

	<!--Постраничная навигация для Vue (ПОКА ЗАКОММЕНТИРУЮ)--->
	<!-- <paginate v-if='clientPageCount'
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
	</paginate> -->
	<div class='clear'></div>
	<Net         v-if='showNetWnd'></Net>
	<ShopsWnd    v-if='showShopsWnd'></ShopsWnd>
	<MerchantWnd v-if='showMerchantWnd'></MerchantWnd>

</section>
</template>

<script>

import NetList       from './components/NetList.vue'
import Net           from './components/Net.vue'
import ShopsWnd      from './components/ShopsWnd.vue'
import MerchantWnd   from './components/MerchantWnd.vue'
import store         from '../store/catalog.js'
import Paginate      from 'vuejs-paginate'
import $             from 'jquery'

export default {
	name: 'users',
	components: {NetList, Net, ShopsWnd, MerchantWnd},
	store: store,
	computed: {
		net() {
			return this.$store.getters.net
		},
		netList() {
			return this.$store.getters.netList
		},
		showShopsWnd() {
			return this.$store.getters.showShopsWnd
		},
		showMerchantWnd() {
			return this.$store.getters.showMerchantWnd
		},
		showNetWnd() {
			return this.$store.getters.showNetWnd
		},
		showNetWnd() {
			return this.$store.getters.showNetWnd
		},
	},
	methods: {
		shopsWnd(){
			this.$store.commit('set', {type: 'showShopsWnd', items: true})
		},
		merchantWnd(){
			this.$store.commit('set', {type: 'showMerchantWnd', items: true})
		},
		netWnd(){
			this.$store.commit('set', {type: 'showNetWnd', items: true})
		},
	},
	created: function() {
		this.$store.commit('set', {type: 'loader',  items: undefined})
		this.$store.commit('set', {type: 'net',     items: undefined})
	},
}

</script>