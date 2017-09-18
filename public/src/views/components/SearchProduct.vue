<template>
	<section class="a-catalog__hdr">
		<div class="a-catalog__hdr-title">Каталог</div>
	 	<div class="a-catalog__hdr-search">
	    <div class="search">
	        <input type="text" class="input search__input" placeholder="Введите название" @keyup ='search'>
	        <button  class="search__submit"></button>
	        <div class="search__icon">
	            <svg>
	                <use xlink:href="#glass"></use>
	            </svg>
	        </div>
	    </div>
	    <div class="catalog__nav-open js-nav-open">
			<span>Каталог</span>
			<svg><use xlink:href="#filter"></use></svg>
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
	mounted: function() {
		$('.js-nav-open').click(function () {
				$('.catalog__nav').fadeIn(200);
				$('body').css('overflow', 'hidden')
		});
		$('.catalog__nav-close').click(function () {
			$('.catalog__nav').fadeOut(200);
			$('body').css('overflow', 'auto')
		});
	}
}

</script>