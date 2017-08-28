import Vue         from 'vue'
import Vuex        from 'vuex'
import VueResource from 'vue-resource'
import Conf        from '../conf/conf.js'

Vue.use(Vuex)
Vue.use(VueResource)

const store = new Vuex.Store({
	state: {
		catalogTree    : [],        // все категории (дерево категорий)
		productList    : [],        // Продукты в категории
		category       : null,      // выбранная категория
		product        : null,      // выбранный продукт
		idActiveCat    : undefined, // id выбранной категории
		clientsList    : [],        // список клиентов
		client         : null,      // выбранный клиент
		idActiveClient : undefined, // id выбранного клиентв
		order          : null,      // выбранный заказ
		orders         : [],        // все заказы
		documents      : [],        // документы в заказе
		allProducts    : [],        // Все продукты, для добавления и удаления из категории
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
		},
		order(state){
			return state.order
		},
		orders(state){
			return state.orders
		},
		documents(state){
			return state.documents
		},
		allProducts(state){
			return state.allProducts
		},
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
		addProdToCat({state, commit}, idProd) {
			let arg = {
				params:{
					id_category : state.idActiveCat,
					id_product  : idProd,
					action      : 'add_product'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.category, null,  arg).then(
				response => {
					let body = response.body
				},
				error => {
					console.log(error);
				}
			)
		},
		deleteCategory({state, commit}, idCategory) {
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
		deleteProdInCat({state, commit}, idProd) {
			let arg = {
				params:{
					id_category : state.idActiveCat,
					id_product  : idProd,
					action      : 'delete_product'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.category, null,  arg).then(
				response => {
					let body = response.body
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
		getAllProducts({commit}) {
			let arg = {
				params:{
					action : 'all_product'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}
			Vue.http.get(Conf.url.category, arg).then(
				response => {
					let body = response.body;
					if (body.products) {
						body.products.forEach(product => {
							// Вводим переменную для поиска
							product.search = true;
						})
					}
					commit('set', {type: 'allProducts', items: body.products})
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
		getClientList({commit}) {
			Vue.http.get(Conf.url.clients).then(
				response => {
					let body = response.body;
					console.log(body.clients)
					commit('set', {type: 'clientsList', items: body.clients})
				},
				error => {
				 	console.log(error);
				}
			)
		},
		getOrder({commit}, orderId) {
			let arg = {
				params:{
					'order.id' : orderId,
					action     : 'order',
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.order, null,  arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
					} else {
						commit('set', {type: 'order', items: body.order})
						commit('set', {type: 'documents', items: body.documents})
						document.location = '/#/order'
					};
				},
				error => {
					console.log(error);
				}
			)
		},
		getOrders({commit}) {
			Vue.http.get(Conf.url.order).then(
				response => {
					let body = response.body
					if (body.orders)
						body.orders.forEach(key => {
				 			key.ctime = new Date(key.ctime)
				 		});

				 	commit('set', {type: 'orders', items: body.orders});
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
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.category, arg).then(
				response => {
					let body = response.body
					// Очищаем список продуктов
					commit('set', {type: 'productList', items: null})
					if (body.category.extend.products.elements.length) {
						body.category.extend.products.elements.forEach(function(key) {
							// Свойства, делаем удобнее
							key.properties = key.properties.elements[0].extend.properties.elements
							// Переменная для поиска
							key.search = true
						});
						commit('set', {type: 'productList', items: body.category.extend.products.elements});
					}
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
		selectClient({commit}, client) {
			commit('set', {type: 'client', items: client})
			if (client)
				commit('set', {type: 'idActiveClient', items: client.id})
			else
				commit('set', {type: 'idActiveClient', items: undefined})
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
	}
})

export default store
