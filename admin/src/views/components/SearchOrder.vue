<template>
	 <section class="a-catalog__hdr">
        <div class="a-catalog__hdr-title">Заказы</div>
        <div class="a-catalog__hdr-search">
            <div class="search">
               <!--  <input type="text" class="input search__input" placeholder="Введите номер" v-model='query' v-on:keyup.enter='search'>
                <div class="search__submit" @click='search' v-if='!loader'></div>
                <div class="search__submit disable_search_submit" v-if='loader'></div>
                <div class="search__icon" :class="{disable_search_icon : loader }" >
                    <svg>
                        <use xlink:href="#glass"></use>
                    </svg>
                </div> -->
            </div>
        </div>
<!--
        <div class="catalog__controls">

            <div class="a-catalog__hdr-controls" style="float: left; margin-left: 20px">
                <div class="btn btn--edit" @click='showdateTo = true'>До: {{dateTo}}</div>
            </div>
            <div class="a-catalog__hdr-controls" style="float: left; margin-left:10px">
                <div class="btn btn--edit" @click='showdateFrom = true'>От: {{dateFrom}}</div>
            </div>

             <div class="a-catalog__hdr-controls" style="float: left; margin-left:10px">
                <div class="btn btn--pickup" @click='dateFilter'>Выбрать</div>
            </div>
        </div> -->


      <!--   <date-picker  :format="formatDate"
            color="#03a9f4"
            @close="showdateFrom = false"
            v-if="showdateFrom"
            v-model="dateFrom"></date-picker>

        <date-picker :format="formatDate"
            color="#4caf50"
            @close="showdateTo = false"
            v-if="showdateTo"
            v-model="dateTo"></date-picker> -->

    </section>
</template>

<script>
import DatePicker from 'vue-md-date-picker'
import moment     from 'moment'
import store      from '../../store/catalog.js'

export default {
    components: {DatePicker},
	data() {
		return {
			showdateFrom : false,
            showdateTo   : false,
            dateFrom     : undefined,
            dateTo       : undefined,
            query        : ''
		}
	},
    computed: {
        orderFilter(){
            return this.$store.getters.orderFilter
        },
        loader() {
            return this.$store.getters.loader
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('L')
        },
        dateFilter(){
            if (!this.$data.dateTo)
                this.$data.showdateTo = true;

            if (!this.$data.dateFrom)
                this.$data.showdateFrom = true;

            if(this.$data.dateTo && this.$data.dateFrom) {
                this.orderFilter.dateFrom = this.$data.dateFrom
                this.orderFilter.dateTo   = this.$data.dateTo
                //this.$store.dispatch('getOrders')
            }
        },
        search() {
           if (this.$data.query.trim()) {
                this.orderFilter.search = this.$data.query.trim();
                this.$store.dispatch('getOrders');
           } else {
                this.orderFilter.search = undefined;
              //  this.$store.dispatch('getOrders');
           }

        },
    },
}

</script>