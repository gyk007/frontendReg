<template>
	<section class="a-catalog__hdr-search">
	    <div class="search">
	        <input type="text" class="input search__input" placeholder="Введите название, артикул" v-model='query'>
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
	data() {
		return {
			query: ''
		}
	}
}

</script>