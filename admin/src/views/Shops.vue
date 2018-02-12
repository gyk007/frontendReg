<template>
  <section>
    <div class="a-catalog__hdr">
      <div class="a-catalog__hdr-title">Магазины</div>
      <div class="catalog__controls">

        <div class="a-catalog__hdr-controls" style="margin-right:10px" v-if='shop'>
          <div class="btn btn btn--edit" @click="shopWnd">Просмотр</div>
        </div>
      </div>
    </div>
    <ShopsList></ShopsList>

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
    <ShopWnd v-if='showShopWnd'></ShopWnd>

  </section>
</template>

<script>

import ShopsList          from './components/ShopsList.vue'
import ShopWnd            from './components/ShopWnd.vue'
import store              from '../store/catalog.js'
import Paginate           from 'vuejs-paginate'
import $                  from 'jquery'

export default {
	name: 'users',
	components: {ShopsList, ShopWnd},
	store: store,
	computed: {
		shop() {
			return this.$store.getters.shop
		},
		shopsList() {
			return this.$store.getters.shopsList
		},
		showShopWnd() {
			return this.$store.getters.showShopWnd
		},
	},
	methods: {
		shopWnd(){
			this.$store.commit('set', {type: 'showShopWnd', items: true})
		},
	},
	created: function() {
		this.$store.commit('set', {type: 'loader',   items: undefined})
		this.$store.commit('set', {type: 'shop',     items: undefined})
	},
}

</script>
