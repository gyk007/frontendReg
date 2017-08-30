<template>
	<section class="a-catalog__hdr-search">
	    <div class="search">
	        <input type="text" class="input search__input" placeholder="Введите название" @keyup ='search'>
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

export default {
	computed: {
		productList() {
			return this.$store.getters.productList
		}
	},
	methods: {
		search() {
			let searchStr = $(event.target).val().toUpperCase()

			this.productList.forEach(key => {
				let name  = key.name ? key.name.toUpperCase() : ""

				if (~name.indexOf(searchStr)) {
					key.search = true
				} else {
					key.search = false
				}
			})
		},
	},
}

</script>