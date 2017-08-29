<template>
	 <section class="a-catalog__hdr">
        <div class="a-catalog__hdr-title">Клиенты</div>
        <div class="a-catalog__hdr-search">
            <form action="#" class="search">
                <input type="text" class="input search__input" placeholder="Введите название, телефон, инн"  @keyup ='search'>
                <div class="search__submit"></div>
                <div class="search__icon">
                    <svg>
                        <use xlink:href="#glass"></use>
                    </svg>
                </div>
            </form>
        </div>

    </section>
</template>

<script>

export default {
	computed: {
        clientsList() {
            return this.$store.getters.clientsList
        }
    },
    methods: {
        search() {
            let searchStr = $(event.target).val()

            this.clientsList.forEach(key => {
                if (~key.official.name.indexOf(searchStr)) {
                    key.search = true
                } else if (~key.official.taxcode.indexOf(parseInt(searchStr))) {
                    key.search = true
                } else if(~key.official.phone.indexOf(parseInt(searchStr))) {
                    key.search = true
                } else {
                    key.search = false
                }
            })
        },
    },
}

</script>