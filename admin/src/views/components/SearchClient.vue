<template>
	 <section class="a-catalog__hdr">
        <div class="a-catalog__hdr-title">Клиенты</div>
        <div class="a-catalog__hdr-search">
            <form action="#" class="search">
                <input type="text" class="input search__input" placeholder="Введите название, телефон, инн"  @blur ='search'>
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
            let searchStr = $(event.target).val() ? $(event.target).val() : '';

            this.clientsList.forEach(key => {
                let name    = key.official.name    ? key.official.name    : '';
                let taxcode = key.official.taxcode ? key.official.taxcode : '';
                let phone   = key.official.phone   ? key.official.phone   : '';


                if (name.toUpperCase().indexOf(searchStr.toUpperCase()) >= 0) {
                    key.search = true
                } else if (phone.toUpperCase().indexOf(searchStr.toUpperCase()) >= 0) {
                    key.search = true
                } else if (taxcode.toUpperCase().indexOf(searchStr.toUpperCase()) >= 0) {
                    key.search = true
                } else {
                    key.search = false
                }
            })
        },
    },
}

</script>