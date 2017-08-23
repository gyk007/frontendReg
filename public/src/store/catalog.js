import Vue         from 'vue'
import Vuex        from 'vuex'
import VueResource from 'vue-resource'
import Conf        from '../conf/conf.js'

Vue.use(Vuex)
Vue.use(VueResource)

const catalogStore = new Vuex.Store({
	state: {
		catalogTree : [],
		productList : [],
		category    : null,
		filterPrice : null,
		product     : null,
		cart        : null,
		cartPrice   : 0,
		shops       : [],
		order       : null,
		orders      : [],
		documents   : [],
	},
	getters: {
		catalogTree(state) {
			return  state.catalogTree
		},
		cart(state) {
			return  state.cart
		},
		cartPrice(state){
			return parseFloat(state.cartPrice.toFixed(2))
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
		filterPrice(state){
			return state.filterPrice
		},
		shops(state){
			return state.shops
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
		calculateCartPrice(state, {products}) {
			state.cartPrice = 0;
			if (products)
				products.forEach((key) => {
					if (key.product.price)
						state.cartPrice +=	key.quantity * key.product.price
				})
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
		addOrder({state, commit}, orderData){
			let arg = {
				params:{
					'order.phone'      : orderData.phone,
					'order.address'    : orderData.address,
					'order.name'       : orderData.name,
					'order.remark'     : orderData.remark,
					'order.email'      : orderData.email,
					'order.id_shop'    : orderData.idShop,
					'order.price'      : state.cartPrice,
					'cart.id_merchant' : state.cart.id_merchant,
					'cart.n'           : state.cart.n,
					action             :  'add',
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
		addDocument({state, commit}, name){
			let arg = {
				params:{
					'document.name': name,
					'order.id'     : state.order.id,
					action         : 'add_document',
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
						commit('set', {type: 'documents', items: body.documents})
					};
				},
				error => {
					console.log(error);
				}
			)
		},
		deleteDocument({state, commit}, name){
			let arg = {
				params:{
					'document.name': name,
					'order.id'     : state.order.id,
					action         : 'delete_document',
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
						commit('set', {type: 'documents', items: body.documents})
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
					commit('set', {type: 'filters',     items: null})
					if (body.category.extend.products.elements.length)
						body.category.extend.products.elements.forEach(function(key) {
							// Добавляем фильтры
							key.filterPrice = true;
							key.filterAlko  = true;
							// Свойства, делаем удобнее
							key.properties = key.properties.elements[0].extend.properties.elements
						})
						commit('set', {type: 'productList', items: body.category.extend.products.elements})
					if (body.category.filter) {
						body.category.filter.elements.forEach(function(key){
							if(key.name == 'Цена')
								commit('set', {type: 'filterPrice', items:key.filterarg})
						})
					}
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
		selectCategory({commit}, category) {
			commit('set', {type: 'category', items: category})
		},
		selectProduct({commit}, product) {
			commit('set', {type: 'product', items: product})
		},

		// Добавить в корзину
		addToCart({state, commit}, product) {
			let arg = {
				params: {
				   action             : 'add',
				   'product.id'       : product.id,
				   'product.quantity' : product.cartQuantity,
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.cart, null, arg).then(
				response => {
					let body = response.body;
					commit('set', {type: 'cart', items: body.cart})
					if (body.cart)
						commit('calculateCartPrice', {products: body.cart.products.elements})
				},
				error => {
					console.log(error);
				}
			)
		},
		// Получить корзину
		getCart({state, commit}, idClinet, product, count) {
			let arg = {
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.cart, null, arg).then(
				response => {
					let body = response.body;
					commit('set', {type: 'shops', items: body.shops})
					commit('set', {type: 'cart',  items: body.cart})
					if (body.cart) {
						commit('calculateCartPrice', {products: body.cart.products.elements})
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		// Удалить продукт из корзины
		deletProdInCart({state, commit}, idProduct) {
			let arg = {
				params:{
					action       : 'delete',
				    'product.id' : idProduct,
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.cart, null, arg).then(
				response => {
					let body = response.body;
					commit('set', {type: 'cart', items: body.cart})
					if (body.cart)
						commit('calculateCartPrice', {products: body.cart.products.elements})
				},
				error => {
					console.log(error);
				}
			)
		},
		calculateCartPrice({state, commit}) {
			commit('calculateCartPrice', {products: state.cart.products.elements})
		}

	}
})

export default catalogStore