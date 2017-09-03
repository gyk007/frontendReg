<template>
	<section class="statistics">

    <div class="a-catalog__hdr">
        <div class="a-catalog__hdr-title">Статистика</div>
        <div class="a-catalog__hdr-search">
            <!-- <div class="search">
                <input type="text" class="input search__input" placeholder="Введите название магазина">
                <input type="submit" class="search__submit" value="">
                <div class="search__icon">
                    <svg>
                        <use xlink:href="#glass"></use>
                    </svg>
                </div>
            </div> -->
        </div>

    </div>
    <div class="statistics__container">
    	<StatShop></StatShop>
    	<StatProduct></StatProduct> 
    </div>

    <div class="statistics__graph">         
    </div>

</section>
</template>

<script>
 
import Store         from '../store/catalog.js'
import StatShop      from './components/StatShop.vue'
import StatProduct   from './components/StatProduct.vue'
import $             from 'jquery'

export default {
	name: 'statistic',
	components: {StatShop, StatProduct},	 
	store: Store,
	created: function() {
		this.$store.dispatch('getStatistic')
	}
}

</script>