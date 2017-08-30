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
		catalogTree   : [],        // дерево категорий
		productList   : [],        // список товаров в выбранной категории
		idActiveCat   : undefined, // id выбранной категории
		category      : null,      // выбранная категория
		filterPrice   : null,      // начальные значени фильра "Цена"
		filterAlko    : null,      // начальные значения фильтра "Крепость об %"
		product       : null,      // выбранные продукт
		cart          : null,      // корзина
		cartPrice     : 0,         // стоимость корзины
		shops         : [],        // список магазинов доступных данному пользователю
		order         : null,      // заказ
		orders        : [],        // список заказов
		documents     : [],        // список документов в заказе
		user          : null,      // данные пользователя
		shop          : null,      // выбраная торговая точка
		loader        : false,     // отвечает за лоадер, если true - лодер включен
		selectOffer   : false,     // вкладка с индивидуальными предложениями, если true - вкладка нажата
		selectShopWnd : false,     // true - показать окно "Выбора торговой точки"
		authError     : false,     // переменная указывает на ошибку авторизации
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
		filterAlko(state){
			return state.filterAlko
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
		user(state){
			return state.user
		},
		shop(state){
			return state.shop
		},
		loader(state){
			return state.loader
		},
		idActiveCat(state){
			return state.idActiveCat
		},
		selectOffer(state){
			return state.selectOffer
		},
		selectShopWnd(state){
			return state.selectShopWnd
		},
		authError(state){
			return state.authError
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
		addOrder({state, dispatch, commit}, orderData){
			let arg = {
				params:{
					'order.phone'      : orderData.phone,
					'order.address'    : orderData.address,
					'order.name'       : orderData.name,
					'order.remark'     : orderData.remark,
					'order.email'      : orderData.email,
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
						document.location = '/#/order/' + body.order.id
						dispatch('getCart')
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
		authorization({dispatch, commit}, data) {
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
						// Ошибка авторизации
						commit('set', {type: 'authError', items:true});
					} else if(body.SESSION) {
						Cookies.set('token', body.SESSION.token);
						// Сброс ошибки авторизации авторизации
						commit('set', {type: 'authError', items:false});
						dispatch('getUser')

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
						document.location = '/#/order/' + orderId
					};
				},
				error => {
					console.log(error);
				}
			)
		},
		getOrders({commit}) {
			// Включаем лоадер
			commit('set', {type: 'loader', items: true})
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
					 	// Выключаем лоадер
						commit('set', {type: 'loader', items: false});
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		getProductList({commit}, idCategory) {
			// Очищаем список продуктов
			commit('set', {type: 'productList', items: []})
			// Включаем лоадер
			commit('set', {type: 'loader', items: true})
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
								key.filterOffer = true;
								// Количесво в корзине по умолчанию
								key.cartQuantity = 1;
								// Свойства, делаем удобнее
								key.properties = key.properties.elements[0].extend.properties.elements
							})
							commit('set', {type: 'productList', items: body.category.extend.products.elements})
						if (body.category.filter) {
							// Начальные значения фильтров
							let filterPrice = {min: 0, max: 0};
							let filterAlko  = {min: 0, max: 0};

							body.category.filter.elements.forEach(function(key){
								if(key.name == 'Price') {
									filterPrice.min = key.filterarg.elements[0].filterarg.value;
									filterPrice.max = key.filterarg.elements[1].filterarg.value;
								}
								if(key.name == 'Alko') {
									filterAlko.min = key.filterarg.elements[0].filterarg.value;
									filterAlko.max = key.filterarg.elements[1].filterarg.value;
								}
							})
							commit('set', {type: 'filterPrice', items: filterPrice})
							commit('set', {type: 'filterAlko',  items: filterAlko})
						}
						// Выключаем лоадер
						commit('set', {type: 'loader', items: false})
						// Выключаем вкладку с индивидуальными предложениями
						commit('set', {type: 'selectOffer', items: false})
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
			if (category)
				commit('set', {type: 'idActiveCat', items: category.id})
			else
				commit('set', {type: 'idActiveCat', items: undefined})
		},
		selectProduct({commit}, product) {
			commit('set', {type: 'product', items: product})
		},
		selectShop({state, commit}, shopId) {
			 let arg = {
				params:{
					token  : Cookies.get('token'),
					shop   : shopId,
					action : 'select_shop'
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
		// Изменить количесво продуктво в корзине
		updateQtyProdInCart({state, commit}, product) {
			let arg = {
				params: {
				   action             : 'add',
				   token              : Cookies.get('token'),
				   'product.id'       : product.id_product,
				   'product.quantity' : product.quantity,
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
	}
})

export default catalogStore