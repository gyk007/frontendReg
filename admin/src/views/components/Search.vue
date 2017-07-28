<template>
	<section class="a-catalog__hdr-search">
		<div class="search">
			<div v-if="$route.fullPath == '/client'">
				<input type="text" class="input search__input" placeholder="Введите название компании" v-model='query'>
			</div>
			<div v-if="$route.fullPath == '/catalog'">
				<input type="text" class="input search__input" placeholder="Введите название, артикул" v-model='query'>
			</div>
			<div v-if="$route.fullPath == '/promotion'">
				<input type="text" class="input search__input" placeholder="Введите название акции" v-model='query'>
			</div>
			<div v-if="$route.fullPath == '/orders'">
				<input type="text" class="input search__input" placeholder="Введите номер заказа" v-model='query'>
			</div>
			<button  class="search__submit"></button>
			<div class="search__icon">
				<svg>
					<use xlink:href="#glass"></use>
				</svg>
			</div>
		</div>
	</section>
</template>

<script>
import store from '../../store/catalog.js'

export default {
	data() {
		return {
			query: ''
		}
	},
	created: function() {
			console.log(this.$route.fullPath)
		}
}

</script>