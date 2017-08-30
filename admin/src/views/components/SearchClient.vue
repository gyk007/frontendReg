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
            let searchStr = $(event.target).val() ? $(event.target).val() : '';

            this.clientsList.forEach(key => {
                let search = (
                    ~key.official.name.toUpperCase().indexOf(searchStr.toUpperCase())    ||
                    ~key.official.taxcode.toUpperCase().indexOf(searchStr.toUpperCase()) ||
                    ~key.official.phone.toUpperCase().indexOf(searchStr.toUpperCase())
                )

                console.log(search);
                if (search > 0) {
                    key.search = true
                } else {
                    key.search = false
                }
            })
        },
    },
}

</script>