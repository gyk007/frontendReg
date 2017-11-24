<template>
<section>
	<div class="a-catalog__hdr">
        <div class="a-catalog__hdr-title">Менеджеры</div>
        <div class="catalog__controls">
        	<div class="a-catalog__hdr-controls" style="margin-right:10px" v-if='merchant'>
				<div class="btn btn btn--edit" @click="merchantWnd">Просмотреть</div>
			</div>
			<div class="a-catalog__hdr-controls" style="margin-right:10px" v-if='merchant'>
				<div class="btn btn btn--edit"   style='background-color: #f48c42; color: #FFF' @click="deleteMerchant">Удалить менеджера</div>
			</div>
		</div>
    </div>
	<MerchantList></MerchantList>

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
	<!-- Компоненты -->

	<MerchantWnd       v-if='showMerchantWnd'></MerchantWnd>
	<MerchantWnd       v-if='showMerchantWnd'></MerchantWnd>
	<DeleteMerchantWnd v-if='showDeleteMerchanttWnd'></DeleteMerchantWnd>

</section>
</template>

<script>

import MerchantList        from './components/MerchantList.vue'
import MerchantWnd         from './components/MerchantWnd.vue'
import DeleteMerchantWnd   from './components/DeleteMerchantWnd.vue'
import store               from '../store/catalog.js'
import Paginate            from 'vuejs-paginate'
import $                   from 'jquery'

export default {
	name: 'merchant',
	components: {MerchantList, MerchantWnd, DeleteMerchantWnd},
	store: store,
	computed: {
		showMerchantWnd() {
			return this.$store.getters.showMerchantWnd
		},
		merchant() {
			return this.$store.getters.merchant
		},
		showNetWnd() {
			return this.$store.getters.showNetWnd
		},
		showDeleteMerchanttWnd(){
			return this.$store.getters.showDeleteMerchanttWnd
		}
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
		deleteMerchant(){
			this.$store.commit('set', {type: 'showDeleteMerchanttWnd', items: true})
		}
	},
	created: function() {
		this.$store.commit('set', {type: 'loader',   items: undefined})
		this.$store.commit('set', {type: 'merchant', items: undefined})
		this.$store.commit('set', {type: 'net',      items: undefined})
		this.$store.commit('set', {type: 'shop',     items: undefined})
	},
	mounted: function() {
		this.$store.dispatch('getMerchantList')
	}
}

</script>