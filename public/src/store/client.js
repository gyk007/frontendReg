import Vue         from 'vue'
import Vuex        from 'vuex'
import VueResource from 'vue-resource'
import Conf        from '../conf/conf.js'

Vue.use(Vuex)
Vue.use(VueResource)

const clientStore = new Vuex.Store({
	state: {
		clientsList : [],
		client      : null,
		idActive    : undefined,
	},
	getters: {
		clientsList(state) {
			return  state.clientsList
		},
		client(state) {
			return state.client
		},
		idActive(state){
			return state.idActive
		}
	},
	mutations: {
		set(state, {type, items}) {
			state[type] = items
		},
		addItemToArry(state, {type, item}) {
			state[type].push(item)
		},
		deleteItemFromArry(state, {type, key, value}) {
			// поиск индекс для удаления
			let indexToRemove = state[type].findIndex(item => item[key] == value);
			state[type].splice(indexToRemove , 1);
		},
		relodClientList(state) {
			Vue.http.get(Conf.url.clients).then(
				response => {
					let body = response.body;
					state.clientsList = body.clients
				},
				error => {
				 	console.log(error);
				}
			)
		}
	},
	actions: {
		addClient({commit}, client) {
			let arg = {
				params:{
					'client.name'    : client.name,
 					'client.person'  : client.person,
					'client.address' : client.address,
					'client.phone'   : client.phone,
					'client.email'	 : client.email,
					action           : 'add'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.clients, null,  arg).then(
				response => {
					let body = response.body
					console.log(body)
					commit('relodClientList')
				},
				error => {
					console.log(error);
				}
			)
		},
		editClient ({commit}, client) {
			let arg = {
				params:{
					'client.id'      : client.id,
					'client.name'    : client.name,
 					'client.person'  : client.person,
					'client.address' : client.address,
					'client.phone'   : client.phone,
					'client.email'	 : client.email,
					action           : 'edit'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}
			console.log(arg);
			Vue.http.post(Conf.url.clients, null,  arg).then(
				response => {
					let body = response.body;
					commit('relodClientList');
				},
				error => {
					console.log(error);
				}
			)
		},
		getClientList({commit}) {
			Vue.http.get(Conf.url.clients).then(
				response => {
					let body = response.body;
					console.log(body)
					commit('set', {type: 'clientsList', items: body.clients})
				},
				error => {
				 	console.log(error);
				}
			)
		},

		deleteClient({commit}, idClient) {
			let arg = {
				params:{
                   	id     : idClient,
					action : 'delete'
				},
				headers: {
					//'Content-Type': 'application/json'
				}
			}

			Vue.http.get(Conf.url.clients, arg).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						console.log(body.ERROR)
					} else {
						commit('relodClientList');
						commit('set', {type: 'client', items: null})
					};
				},
				error => {
					console.log(error);
				}
			)
		},
		selectClient({commit}, client) {
			commit('set', {type: 'client', items: client})
			if (client)
				commit('set', {type: 'idActive', items: client.id})
			else
				commit('set', {type: 'idActive', items: undefined})
		},
	}
})

export default clientStore