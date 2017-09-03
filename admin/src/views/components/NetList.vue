<template>
	 <div class="b-catalog__container">
		<div class="b-catalog__table">

			<div class="b-catalog__row js-t-row">
				<div class="b-catalog__cell b-catalog__table-hdr">Название</div>
				<div class="b-catalog__cell b-catalog__table-hdr">Имя представителя</div>
				<div class="b-catalog__cell b-catalog__table-hdr">Телефон</div>
				<div class="b-catalog__cell b-catalog__table-hdr">ИНН</div>
				<div class="b-catalog__cell b-catalog__table-hdr"></div>
			</div>

			<div class="b-catalog__row js-t-row" 
				v-for='net in netList' 
				v-on:click="selectNet(net)"
				:class="{ active : (net.id == idSelectedNet) }">
				<div class="b-catalog__cell b-catalog__table-name">
					<div class="b-catalog__table-title--img"><img src="pic/nologo.png" alt="logo"></div>
					<span>{{net.official.name}}</span>
				</div>
				<div class="b-catalog__cell b-catalog__table-title">{{net.official.person}}</div>
				<div class="b-catalog__cell b-catalog__table-history">{{net.official.phone}}</div>
				<div class="b-catalog__cell b-catalog__table-history">{{net.official.taxcode}}</div>
				<div class="b-catalog__cell b-catalog__table-history"><a data-fancybox  data-src="#popup__client" href="javascript:;" class="btn btn--edit">Просмотр</a></div>
			</div>
		</div>
		<!-- Лоадер -->
		<div class='product_loader' v-if='loader'><img src="pic/loading.gif"></div>
	</div>
</div>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'

	export default {
		computed: {
			netList() {
				return this.$store.getters.netList
			},
			idSelectedNet() {
				if (this.$store.getters.net){
					return this.$store.getters.net.id
				} else {
					return undefined
				}					 		 		 
			},
			loader() {
				return this.$store.getters.loader
			}
		},
		methods: {
			selectNet(net) {				 				 
				this.$store.commit('set', {type: 'net', items: net}) 
			},
		},
		created: function() {
			this.$store.commit('set', {type: 'clientsList', items: undefined})
			this.$store.commit('set', {type: 'loader', items: undefined})
		},
		mounted: function() {
			this.$store.dispatch('getNetList')
		}
	}
</script>