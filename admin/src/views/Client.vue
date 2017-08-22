<template>
<section class="b-catalog">
	<div class="a-catalog__hdr">
		<div class="a-catalog__hdr-title">Клиенты</div>

		<!-- <div class="a-catalog__hdr-controls">
			<a data-fancybox data-src="#popup__client" href="javascript:;" class="btn btn--checkout" v-on:click="unselectClient">Новый магазин</a>
		</div> -->
		<div class="a-catalog__hdr-controls" style="margin-right:10px" v-if="client">
			<a data-fancybox  data-src="#popup__client" href="javascript:;" class="btn btn--edit">Редактировать</a>
		</div>
		<div class="a-catalog__hdr-controls" style="margin-right:10px" v-if="client">
			<a data-fancybox data-src="#popup__delete_client" href="javascript:;" class="btn btn--delete">Удалить</a>
		</div>
	</div>
	<ClientList></ClientList>
	<NewClient></NewClient>
	<DeleteWnd></DeleteWnd>
</section>
</template>

<script>


import ClientList    from './components/ClientList.vue'
import NewClient     from './components/NewClient.vue'
import DeleteWnd     from './components/DeleteClient.vue'
import store         from '../store/catalog.js'
import $             from 'jquery'

export default {
	name: 'users',
	components: {ClientList, NewClient, DeleteWnd},
	store: store,
	computed: {
		client() {
			return this.$store.getters.client
		},
	},
	methods: {
		unselectClient(){
			this.$store.dispatch('selectClient', null)
		},
	},
	created: function() {
		this.$store.dispatch('selectClient', null)
	},
}

</script>