<template>
<section class="promotion">
    <div class="a-catalog__hdr">
        <div class="a-catalog__hdr-title">Акции</div>
        <Search></Search>

            <div class="a-catalog__hdr-controls">
                <a data-fancybox="" data-src="#popup__product" href="javascript:;" class="btn btn--checkout">Новая акция</a>
            </div>
    </div>
    <PromotionList></PromotionList>
</section>
</template>

<script>

import Search        from './components/Search.vue'
import PromotionList from './components/PromotionList.vue'
import store         from '../store/catalog.js'
import $             from 'jquery'

export default {
	name: 'catalog',
	components: {Search, PromotionList},
	store: store,
	computed: {
		category() {
				return this.$store.getters.category
			},
	},
	methods: {
		unselectCategoory(){
			$('.js-catalog-category a').removeClass('active')
			this.$store.dispatch('selectCategory', null)
		},
		upCategoory(category){
		 // $('.js-catalog-category a').removeClass('active')
			this.$store.dispatch('leftCategory', category.id)
		},
		downCategoory(category){
			$('.js-catalog-category a').removeClass('active')
			this.$store.dispatch('rightCategory', category.id)
		},
	},
	created: function() {
		//this.$store.dispatch('selectCategory', null)
	}
}

</script>