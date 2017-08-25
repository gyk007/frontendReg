<template>
	<section class="a-catalog__hdr-search">
		<div class="search">
			<div v-if="$route.fullPath == '/catalog'">
				<input type="text" class="input search__input" placeholder="Введите название"  @keyup ='search'>
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
	computed: {
		productList() {
			return this.$store.getters.productList
		}
	},
	methods: {
		search() {
			let searchStr = $(event.target).val()

			this.productList.forEach(key => {
				if (~key.name.indexOf(searchStr)) {
					key.search = true
				} else {
					key.search = false
				}
			})
		},
	},
}

</script>