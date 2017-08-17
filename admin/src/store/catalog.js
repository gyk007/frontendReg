import Vue         from 'vue'
import Vuex        from 'vuex'
import VueResource from 'vue-resource'
import Conf        from '../conf/conf.js'

Vue.use(Vuex)
Vue.use(VueResource)

const store = new Vuex.Store({
	state: {
		catalogTree    : [],
		productList    : [],
		category       : null,
		product        : null,
		idActiveCat    : undefined,
		clientsList    : [],
		client         : null,
		idActiveClient : undefined,
	},
	getters: {
		catalogTree(state) {
			return  state.catalogTree
		},
		productList(state) {
			return state.productList
		},
		category(state) {
			return state.category
		},
		product(state){
			return state.product
		},
		idActiveCat(state){
			return state.idActiveCat
		},
		clientsList(state) {
			return  state.clientsList
		},
		client(state) {
			return state.client
		},
		idActiveClient(state){
			return state.idActiveClient
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
		relodCatalogTree(state) {
			Vue.http.get(Conf.url.catalog).then(
				response => {
					let body = response.body;
					state.catalogTree = body.catalog.child
				},
				error => {
					console.log(error);
				}
			)
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
		addCategory({commit}, category) {
			let arg = {
				params:{
					'category.name'        : category.name,
					'category.description' : category.description,
					'category.visible'     : category.visible,
					'category.face'        : category.face,
					action                 : 'add'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.category, null,  arg).then(
				response => {
					let body = response.body
					commit('relodCatalogTree')
				},
				error => {
					console.log(error);
				}
			)
		},
		editCategory ({commit}, category) {
			let arg = {
				params:{
					'category.id'          : category.id,
					'category.name'        : category.name,
					'category.description' : category.description,
					'category.visible'     : category.visible,
					'category.face'        : category.face,
					action                 : 'edit'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.category, null,  arg).then(
				response => {
					let body = response.body;
					commit('relodCatalogTree');
				},
				error => {
					console.log(error);
				}
			)
		},
		getCatalogTree({commit}) {
			Vue.http.get(Conf.url.catalog).then(
				response => {
					let body = response.body;
					commit('set', {type: 'catalogTree', items: body.catalog.child})
				},
				error => {
					console.log(error);
				}
			)
		},
		getProductList({commit}, idCategory) {
			let result;

			let arg = {
				params:{
					id: idCategory
				},
				headers: {
					//'Content-Type': 'application/json'
				}
			}

			Vue.http.get(Conf.url.category, arg).then(
				response => {
					let body = response.body
					// Очищаем список продуктов
					commit('set', {type: 'productList', items: null})
					if (body.category.extend.products.elements.length)
						commit('set', {type: 'productList', items: body.category.extend.products.elements})
				},
				error => {
					console.log(error);
				}
			)
		},
		deleteCategory({commit}, idCategory) {
			let arg = {
				params:{
					id     : idCategory,
					action : 'delete'
				},
				headers: {
					//'Content-Type': 'application/json'
				}
			}

			Vue.http.get(Conf.url.category, arg).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						console.log(body.ERROR)
					} else {
						commit('relodCatalogTree');
						commit('set', {type: 'category', items: null})
					};
				},
				error => {
					console.log(error);
				}
			)
		},
		// Так как это дероево - влево означает поднять вверх в интерфейсе
		leftCategory({commit}, idCategory) {
			let arg = {
				params:{
					id     : idCategory,
					action : 'left'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}
			Vue.http.post(Conf.url.category, null, arg).then(
				response => {
					let body = response.body;
					commit('relodCatalogTree');
				},
				error => {
					console.log(error);
				}
			)
		},
		// Так как это дероево - вправо означает опустить вниз в интерфейсе
		rightInCategory({commit}, idCategory) {
			let arg = {
				params:{
					id     : idCategory,
					action : 'rdown'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.category, null, arg).then(
				response => {
					let body = response.body;
					commit('relodCatalogTree');
				},
				error => {
					console.log(error);
				}
			)
		},
		// Так как это дероево - вправо означает опустить вниз в интерфейсе
		rightCategory({commit}, idCategory) {
			let arg = {
				params:{
					id     : idCategory,
					action : 'right'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.category, null, arg).then(
				response => {
					let body = response.body;
					commit('relodCatalogTree');
				},
				error => {
					console.log(error);
				}
			)
		},
		// Переместить в нижнюю категорию
		inCategory({commit}, idCategory) {
			let arg = {
				params:{
					id     : idCategory,
					action : 'rdown'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.category, null, arg).then(
				response => {
					let body = response.body;
					commit('relodCatalogTree');
				},
				error => {
					console.log(error);
				}
			)
		},
		selectCategory({commit}, category) {
			commit('set', {type: 'category', items: category})
			if (category)
				commit('set', {type: 'idActiveCat', items: category.id})
			else
				commit('set', {type: 'idActiveCat', items: undefined})

		},
		selectProduct({commit}, product) {
			if (product.properties.elements)
				product.properties = product.properties.elements[0].extend.properties.elements
			commit('set', {type: 'product', items: product})
		},
		addClient({commit}, client) {
			let arg = {
				params:{
					'client.name'                  : client.name,
					'client.person'                : client.person,
					'client.delivery_address'      : client.delivery_address,
					'client.legal_address'         : client.legal_address,
					'client.phone'                 : client.phone,
					'client.email'                 : client.email,
					'client.password'              : client.password,
					'client.logo'                  : client.logo,
					'client.bank'                  : client.bank,
					'client.account_number'        : client.account_number,
					'client.correspondent_account' : client.correspondent_account,
					'client.bik'                   : client.bik,
					'client.inn'                   : client.inn,
					'client.kpp'                   : client.kpp,
					'client.ogrn'                  : client.ogrn,
					action                         : 'add'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.clients, null,  arg).then(
				response => {
					let body = response.body
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
					'client.id'                  : client.id,
					'client.name'                  : client.name,
					'client.person'                : client.person,
					'client.delivery_address'      : client.delivery_address,
					'client.legal_address'         : client.legal_address,
					'client.phone'                 : client.phone,
					'client.email'                 : client.email,
					'client.password'              : client.password,
					'client.logo'                  : client.logo,
					'client.bank'                  : client.bank,
					'client.account_number'        : client.account_number,
					'client.correspondent_account' : client.correspondent_account,
					'client.bik'                   : client.bik,
					'client.inn'                   : client.inn,
					'client.kpp'                   : client.kpp,
					'client.ogrn'                  : client.ogrn,
					action                         : 'edit'
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
				commit('set', {type: 'idActiveClient', items: client.id})
			else
				commit('set', {type: 'idActiveClient', items: undefined})
		},

	}
})

export default store