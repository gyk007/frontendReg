import Vue         from 'vue'
import Vuex        from 'vuex'
import VueResource from 'vue-resource'
import Conf        from '../conf/conf.js'
import Cookies     from 'js-cookie'
import $           from 'jquery'


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
		authError   : false,
		user        : null,
		shop        : null,
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
		authError(state){
			return state.authError
		},
		user(state){
			return state.user
		},
		shop(state){
			return state.shop
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
		addDocument({state, commit}, name){
			let arg = {
				params:{
					'document.name': name,
					'order.id'     : state.order.id,
					action         : 'add_document',
					token          : Cookies.get('token'),
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
					token              : Cookies.get('token'),
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
		// Добавить в корзину
		addToCart({state, commit}, product) {
			let arg = {
				params: {
				   action             : 'add',
				   token              : Cookies.get('token'),
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
					if (body.ERROR) {
						console.log(body.ERROR);
						if (body.ERROR.AUTH)
							document.location = '/#/auth'
					} else {
						commit('set', {type: 'cart', items: body.cart})
						if (body.cart)
							commit('calculateCartPrice', {products: body.cart.products.elements})
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		authorization({state, commit}, data) {
			let arg = {
				params: {
				   'login'    : data.login,
				   'password' : data.password,
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.order, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR);
						if (body.ERROR.AUTH)
							commit('set', {type: 'authError', items: true});
					} else {
						if (body.TOKEN)
							Cookies.set('token', body.TOKEN);

						commit('set', {type: 'authError', items: true});
						commit('set', {type: 'user',      items: body.USER});
						commit('set', {type: 'shops',     items: body.USER.shops});

						$.fancybox.close()

						document.location = '/#/select_shop'
						window.location.reload()
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		calculateCartPrice({state, commit}) {
			commit('calculateCartPrice', {products: state.cart.products.elements})
		},
		deleteDocument({state, commit}, name){
			let arg = {
				params:{
					'document.name': name,
					'order.id'     : state.order.id,
					action         : 'delete_document',
					token          : Cookies.get('token'),
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
		// Удалить продукт из корзины
		deletProdInCart({state, commit}, idProduct) {
			let arg = {
				params:{
					action       : 'delete',
				    'product.id' : idProduct,
				    token        : Cookies.get('token'),
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.cart, null, arg).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						console.log(body.ERROR);
						if (body.ERROR.AUTH)
							document.location = '/#/auth'
					} else {
						commit('set', {type: 'cart', items: body.cart})
						if (body.cart)
							commit('calculateCartPrice', {products: body.cart.products.elements})
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		// Получить корзину
		getCart({state, commit}, idClinet, product, count) {
			let arg = {
				params:{
				    token : Cookies.get('token'),
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.cart, null, arg).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						console.log(body.ERROR);
						if (body.ERROR.AUTH)
							document.location = '/#/auth'
					} else {
						commit('set', {type: 'cart',  items: body.cart})
						if (body.cart) {
							commit('calculateCartPrice', {products: body.cart.products.elements})
						}
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		getCatalogTree({commit}) {
			let arg = {
				params:{
					token : Cookies.get('token'),
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.catalog, arg).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						console.log(body.ERROR);
						if (body.ERROR.AUTH)
							document.location = '/#/auth'
					} else {
						commit('set', {type: 'catalogTree', items: body.catalog.child})
					}
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
					token      : Cookies.get('token'),
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.order, null,  arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR);
						if (body.ERROR.AUTH)
							document.location = '/#/auth'
					} else {
						commit('set', {type: 'order',     items: body.order})
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
			let arg = {
				params:{
					token : Cookies.get('token'),
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.order, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR);
						if (body.ERROR.AUTH)
							document.location = '/#/auth'
					} else {
						if (body.orders)
							body.orders.forEach(key => {
					 			key.ctime = new Date(key.ctime)
					 		});
					 	commit('set', {type: 'orders', items: body.orders});
					}
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
					id    : idCategory,
					token : Cookies.get('token'),
				},
				headers: {
					//'Content-Type': 'application/json'
				}
			}

			Vue.http.get(Conf.url.category, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR);
						if (body.ERROR.AUTH)
							document.location = '/#/auth'
					} else {
						// Очищаем список продуктов
						commit('set', {type: 'productList', items: null})
						commit('set', {type: 'filters',     items: null})
						if (body.category.extend.products.elements.length)
							body.category.extend.products.elements.forEach(function(key) {
								// Добавляем поиск
								key.search = true;
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
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		getUser({commit}) {
			let arg = {
				params:{
					token : Cookies.get('token'),
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.client, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR);
						if (body.ERROR.AUTH)
							document.location = '/#/auth'
					} else {
						console.log(body)
						commit('set', {type: 'shop',   items: body.SHOP})
						commit('set', {type: 'user',   items: body.USER});
						commit('set', {type: 'shops',  items: body.USER.shops})

					}
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
		selectShop({state, commit}, shopId) {
			 let arg = {
				params:{
					token         : Cookies.get('token'),
					'shop.id'     : shopId,
					'merchant.id' : state.user.id,
					action        : 'select_shop'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.client, null, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR);
						if (body.ERROR.AUTH)
							document.location = '/#/auth'
					} else {
						commit('set', {type: 'shop',  items: body.SHOP})

						$.fancybox.close()

						document.location = '/#/orders'
						window.location.reload()
					}
				},
				error => {
					console.log(error);
				}
			)
		},
	}
})

export default catalogStore