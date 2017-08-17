<template>
    <div class="user">
    <div class="a-catalog__hdr">
        <div class="a-catalog__hdr-title">Пользователи</div>
        <div class="a-catalog__hdr-search">
            <form action="#" class="search">
                <input type="text" class="input search__input" placeholder="Введите название магазина">
                <input type="submit" class="search__submit" value="">
                <div class="search__icon">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#glass"></use>
                    </svg>
                </div>
            </form>
        </div>

    </div>

    <div class="promotion__table">
        <div class="promotion__row">
            <div class="promotion__cell">
                <div class="notification__hdr-sort">
                    <span class="notification__hdr-sort--txt">Сортировать по:</span>
                    <span class="notification__hdr-sort--link">новым</span>
                </div>
            </div>
            <div class="promotion__cell promotion__cell-title"><span class="js-a">Тип аккаунта</span></div>
            <div class="promotion__cell promotion__cell-title"><span class="js-b">Дата регистрации</span></div>
            <div class="promotion__cell">21 546 акций</div>
    </div>



<div class="promotion__row js-t-row">
    <div class="promotion__cell promotion__cell-name">

        <span class="promotion__cell-name--wrap">Азбука Вкуса</span>
        <div class="promotion__mob">
            <div class="promotion__mob-item">
                <div class="promotion__mob-title js-a-clone"></div>
                <div class="promotion__mob-txt js-type-clone"></div>
            </div>
            <div class="promotion__mob-item">
                <div class="promotion__mob-title js-b-clone"></div>
                <div class="promotion__mob-txt js-sign-clone"></div>
            </div>
        </div>
    </div>
    <div class="promotion__cell promotion__cell-type"><span class="js-type">Клиент</span></div>
    <div class="promotion__cell promotion__cell-sign"><span class="js-sign">17 ноября, 2016</span></div>
    <div class="promotion__cell promotion__cell-btn"><a href='#'>Управвление доступом</a></div>
</div>

    </div>
</div>
</template>

<script>

import CardProduct from './components/CardProduct.vue'
import CardAddress from './components/CardAddress.vue'
import Store       from '../store/catalog.js'
import $           from 'jquery'

export default {
	name: 'card',
	components: {CardAddress, CardProduct},
	store: Store,
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