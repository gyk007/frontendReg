<template>
	<section class="catalog__nav">
		<div class="catalog__nav-close">X</div>
		<ul class="catalog__nav-list" id="catalog-nav">
				<li  class="catalog__nav-item" v-for="category1 in catalogTree">

						<a v-on:click="getProductList(category1)" :class="[idActiveCat == category1.id ? 'active' : '']">{{category1.name}}</a>

						<div class="catalog__nav-btn js-catalog-btn-trigger" v-if="category1.child.length" v-on:click="showSubCategory"></div>

						<ul class="catalog__nav-sub"  v-if="category1.child">

								<li v-bind:class="{ 'catalog__nav-category js-catalog-category': !category2.child.length }" v-for="category2 in category1.child">

										<a v-on:click="getProductList(category2)"  :class="[idActiveCat == category2.id ? 'active' : '']">{{category2.name}}</a>

										<div class="catalog__nav-btn js-catalog-btn-trigger" v-if="category2.child.length" v-on:click="showSubCategory"></div>

										<ul class="catalog__nav-sub" v-if="category2.child">

												<li v-bind:class="{ 'catalog__nav-category js-catalog-category': !category3.child.length }" v-for="category3 in category2.child">

														<a v-on:click="getProductList(category3)"  :class="[idActiveCat == category3.id ? 'active' : '']">{{category3.name}}</a>

														<div class="catalog__nav-btn js-catalog-btn-trigger" v-if="category3.child.length" v-on:click="showSubCategory"></div>

														<ul class="catalog__nav-sub" v-if="category3.child">

																<li class="catalog__nav-category js-catalog-category" v-for="category4 in category3.child">

																	<a  v-on:click="getProductList(category4)"  :class="[idActiveCat == category4.id ? 'active' : '']" style='padding-left:10px'>{{category4.name}}</a>

																</li>
														</ul>
												</li>
										</ul>
								</li>
						</ul>
				</li>
		</ul>
	</section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'

	export default {
		computed: {
			catalogTree() {
					return this.$store.getters.catalogTree
				},
				idActiveCat() {
					return this.$store.getters.idActiveCat
				}
		},
		methods: {
			getProductList(category) {
				this.$store.dispatch('getProductList', category.id)
				this.$store.dispatch('selectCategory', category)
			 	$('.jq-scroll').mCustomScrollbar()
			 	$('.catalog__nav').fadeOut(200)
				$('body').css('overflow', 'auto')
			},
			showSubCategory() {
			 	let btn = $(event.target);
			 	btn.next('.catalog__nav-sub')
	        	.slideToggle(200, function () {
	         		btn.toggleClass('active')
	      		});
			}
		},
		created: function() {
			this.$store.dispatch('getCatalogTree')
		}
	}
</script>