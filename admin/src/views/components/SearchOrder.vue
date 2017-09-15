<template>
	 <section class="a-catalog__hdr">
		<div class="a-catalog__hdr-title">Заказы</div>
		<div class="a-catalog__hdr-search">
			<div class="search">
				<input type="text" class="input search__input" placeholder="Введите номер" v-model='ordersFilter.search' v-on:keyup.enter='search'>
				<div class="search__submit" @click='search' v-if='!loader'></div>
				<div class="search__submit disable_search_submit" v-if='loader'></div>
				<div class="search__icon" :class="{disable_search_icon : loader }" >
					<svg>
						<use xlink:href="#glass"></use>
					</svg>
				</div>
			</div>
		</div>

		<div class="catalog__controls">

			<div class="a-catalog__hdr-controls" style="float: left; margin-left:10px">
				<div class="btn btn--edit" @click='showDateFrom = true'>От: {{ordersFilter.dateFrom.locale('ru').format('L')}}</div>
			</div>

			<div class="a-catalog__hdr-controls" style="float: left; margin-left: 20px">
				<div class="btn btn--edit" @click='showDateTo = true'>До: {{ordersFilter.dateTo.locale('ru').format('L')}}</div>
			</div>

		</div>


		<date-picker  :format="selectDateFrom"
			name='ДАТА ОТ'
			color="#03a9f4"
			@close="showDateFrom = false"
			v-if="showDateFrom"
			v-model="dateFrom"></date-picker>

		<date-picker :format="selectDateTo"
			name='ДАТА ДО'
			color="#4caf50"
			@close="showDateTo = false"
			v-if="showDateTo"
			v-model="dateTo"></date-picker>

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
			showDateFrom : false,
			showDateTo   : false,
			dateTo       : this.$store.getters.ordersFilter.dateTo.locale('en').format('L'),
			dateFrom     : this.$store.getters.ordersFilter.dateFrom.locale('en').format('L'),
		}
	},
	computed: {
		ordersFilter(){
			return this.$store.getters.ordersFilter
		},
		loader() {
			return this.$store.getters.loader
		}
	},
	methods: {
		selectDateFrom(date) {
			date = new Date(date);
			date = moment(date),
			this.$store.getters.ordersFilter.dateFrom = date;

			if (this.ordersFilter.dateFrom && this.ordersFilter.dateTo)
				this.$store.dispatch('getOrders');

			return date.locale('en').format('L');
		},
		selectDateTo(date){
			date = new Date(date);
			date = moment(date);
			this.$store.getters.ordersFilter.dateTo = date;

			if (this.ordersFilter.dateFrom && this.ordersFilter.dateTo)
				this.$store.dispatch('getOrders');

			return date.locale('en').format('L');
		},
		search() {
			if(this.ordersFilter.search)
				this.ordersFilter.search = this.ordersFilter.search.trim();

			this.$store.dispatch('getOrders');
		},
	},
}

</script>