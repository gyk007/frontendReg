<template>
	 <section class="a-catalog__hdr-search">
        <div class="search">
            <input type="text" class="input search__input" placeholder="Введите название, телефон, инн" v-model='query'>
            <div class="search__submit" @click='search' v-if='!loader'></div>
            <div class="search__submit disable_search_submit" v-if='loader'></div>
            <div class="search__icon" :class="{disable_search_icon : loader }" >
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
    },
    computed: {
        loader() {
            return this.$store.getters.loader
        }
    },
    methods: {
        search() {
            if(this.$data.query.trim())
                this.$store.dispatch('searchNet', this.$data.query.trim())
        },
    },
}

</script>