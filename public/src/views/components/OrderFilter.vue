<template>
	<section class="aa-order__filter">
            <div name="admin-all-orders-filter">

                <div class="aa-order__filter-item">
                    <div class="aa-order__filter-hdr">Статус</div>

                    <div class="aa-order__filter-chb" v-for='status in allOrderStatus'>

                        <label>
                            <toggle-button :value="true"  :sync="true" @change="selectStatus(status)"/>
                            <span>{{status.description}}</span>
                        </label>

                    </div>

                </div>

                </div>

            </div>
        </section>
</template>

<script>
	import store from '../../store/catalog.js'
	import $     from 'jquery'

	export default {
		computed: {
			orders() {
				return this.$store.getters.orders
			},
			ordersFilter(){
				return this.$store.getters.ordersFilter
			},
			allOrderStatus() {
				if(this.$store.getters.allOrderStatus) {
					this.$store.getters.allOrderStatus.forEach(key => {
						key.checked = true;
					})
				}

				return this.$store.getters.allOrderStatus
			}
		},
		methods: {
			selectStatus(status) {
				status.checked = !status.checked;
				let filter = [];
				this.allOrderStatus.forEach(key => {
					if (key.checked == true) {
						filter.push(key.id);
					}
				});
				this.ordersFilter.status = filter;

			 	this.$store.dispatch('getOrders')
			},
		},
		created: function() {
			this.$store.dispatch('getStatus')
		},
	}
</script>