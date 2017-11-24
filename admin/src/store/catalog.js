import Vue         from 'vue'
import Vuex        from 'vuex'
import VueResource from 'vue-resource'
import Conf        from '../conf/conf.js'
import moment      from 'moment'
import 'moment/locale/ru'
import 'webix'

Vue.use(Vuex)
Vue.use(VueResource)

const store = new Vuex.Store({
	state: {
		catalogTree            : undefined, // все категории (дерево категорий)
		productList            : undefined, // Продукты в категории
		category               : undefined, // выбранная категория
		product                : undefined, // выбранный продукт
		idActiveCat            : undefined, // id выбранной категории
		netList                : undefined, // список сетей
		net                    : undefined, // выбранная сеть  ( выбераем ее о вкладке Клиенты)
		shop                   : undefined, // выбранный магазин ( выбераем его во вкладке Клиент, при нажатии на кнопку Торговые точки)
		order                  : undefined, // выбранный заказ
		orders                 : undefined, // все заказы
		documents              : undefined, // документы в заказе
		allProducts            : undefined, // Все продукты, для добавления и удаления из категории
		loader                 : false,     // отвечает за лоадер, если true - лодер включен
		loaderNetList          : false,     // отвечает за лоадер для списка организаций
		loaderMerchantList     : false,     // отвечает за лоадер для списка представителей
		shopList               : undefined, // торговые точки длч выбранного клиента
		showShopsWnd           : false,     // показать окно торговых точек
		merchant               : undefined, // торговый пердставитель сети,
		merchantList           : undefined, // все зарегестрированные менеджеры
		merchantAlreadyReg     : undefined, // торговый пердставитель сети, который ужк зарегестрирован. Получаем его при регистрации нового представителя, когда такой емаил уже исспользует другой представитель
		selectedProduct        : undefined, // выбранный товра (в каталоге или заказе)
		showMerchantWnd        : false,     // показать окно торговой точки
		showRegWnd             : false,     // показать окно подтверждения сброса пароля
		statNet                : undefined, // статистика сетей
		statShop               : undefined, // статистика торговых точек
		statProduct            : undefined, // статистика товаров
		error                  : undefined, // в переменную записываем ошибку
		sendMailLoader         : false,     // отвечает за лоадер при отправке почты , если true - лодер включен
		isSendMail             : false,     // указывает отправлено ли письмо, если true - письмо отправлено
		allOrderStatus         : undefined, // Все статусы заказа
		showProductTbl         : false,     // Показать окно со списком продуктов, для добавления в категорию
		showImageWnd           : false,     // true - показать окно с картинкой товра
		showNetWnd             : false,     // Показать окно c данными сети
		showDeleteMerchanttWnd : false,     // Показать окно для удалени клиента
		ordersFilter    : {          // Фильтры заказа
			dateTo    : moment(),                       // Начльная установка Даты До (сегодня)
			dateFrom  : moment().subtract(1, 'months'), // Начальная установка Даты От (месяц назад)
			search    : undefined,                      // Поисковая строка
			status    : undefined,                      // Стату массив с id статусов
		}
	},
	getters: {
		allProducts(state){
			return state.allProducts
		},
		catalogTree(state) {
			return  state.catalogTree
		},
		productList(state) {
			return state.productList
		},
		category(state) {
			return state.category
		},
		error(state){
			return state.error
		},
		idActiveCat(state){
			return state.idActiveCat
		},
		netList(state) {
			return  state.netList
		},
		net(state) {
			return state.net
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
		loader(state){
			return state.loader
		},
		loaderNetList(state){
			return state.loaderNetList
		},
		product(state){
			return state.product
		},
		searchClient(state){
			return state.searchClient
		},
		shopList(state){
			return state.shopList
		},
		showShopsWnd(state){
			return state.showShopsWnd
		},
		showMerchantWnd(state){
			return state.showMerchantWnd
		},
		merchant(state){
			return state.merchant
		},
		shop(state) {
			return state.shop
		},
		showRegWnd(state){
			return state.showRegWnd
		},
		statNet(state){
			return state.statNet
		},
		statShop(state){
			return state.statShop
		},
		statProduct(state){
			return state.statProduct
		},
		sendMailLoader(state){
			return state.sendMailLoader
		},
		isSendMail(state){
			return state.isSendMail
		},
		allOrderStatus(state){
			return state.allOrderStatus
		},
		ordersFilter(state){
			return state.ordersFilter
		},
		showProductTbl(state){
			return state.showProductTbl
		},
		showImageWnd(state){
			return state.showImageWnd
		},
		showNetWnd(state){
			return state.showNetWnd
		},
		selectedProduct(state){
			return state.selectedProduct
		},
		showDeleteMerchanttWnd(state){
			return state.showDeleteMerchanttWnd
		},
		merchantAlreadyReg(state) {
			return state.merchantAlreadyReg
		},
		loaderMerchantList(state) {
			return state.loaderMerchantList
		},
		merchantList(state) {
			return state.merchantList
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
			// Очищаем список продуктов
			commit('set', {type: 'productList', items: undefined})

			let arg = {
				params:{
					'category.name'        : category.name,
					'category.description' : category.description,
					'category.visible'     : category.visible,
					action                 : 'add'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.category, null,  arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						commit('relodCatalogTree')
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		/**
		 * Добавить для сети существующего представителя
		 * @param {netAndMerchant} - объект содержит net - объект сети, merchant - объект менеджера
		 */
		addMerchantToNet({state, commit}, netAndMerchant) {
			let arg = {
				params:{
					id_merchant : netAndMerchant.merchant.id,
					id_net      : netAndMerchant.net.id,
					action      : 'add_merchant_to_net'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.clients, null,  arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						// Закрываем текущее окно
						commit('set', {type: 'showRegWnd',      items: false})
						// Закрываем окно предсавителя
						commit('set', {type: 'showMerchantWnd', items: false})
						// Добаляем представителя в выбранную организаци
						state.net.merchant_name  = netAndMerchant.merchant.name;
						state.net.merchant_email = netAndMerchant.merchant.email;
						state.net.merchant_phone = netAndMerchant.merchant.phone;
						// Убираем выделение в таблице Клиенты
						commit('set', {type: 'net', items: undefined})
						$$('NetListDt').unselectAll();
						commit('set', {type: 'merchantAlreadyReg', items: undefined})
					}
				},
				error => {
					console.log(error);
				}
			)

		},
		/**
		 * Добавить для сети существующего представителя
		 * @param {addMerchantToShop} - объект содержит shop - объект магазина, merchant - объект менеджера
		 */
		addMerchantToShop({state, commit}, netAndMerchant) {
			let arg = {
				params:{
					id_merchant : netAndMerchant.merchant.id,
					id_shop     : netAndMerchant.shop.id,
					action      : 'add_merchant_to_shop'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.clients, null,  arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						// Закрываем текущее окно
						commit('set', {type: 'showRegWnd',      items: false})
						// Закрываем окно предсавителя
						commit('set', {type: 'showMerchantWnd', items: false})
						// Добаляем представителя в выбранный магазин
						state.shop.merchant.name  = netAndMerchant.merchant.name;
						state.shop.merchant.email = netAndMerchant.merchant.email;
						state.shop.merchant.phone = netAndMerchant.merchant.phone;

						// Убираем выделение в таблице Клиенты
						commit('set', {type: 'shop', items: undefined})
						commit('set', {type: 'merchantAlreadyReg', items: undefined})
					}
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
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
					}
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
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						commit('relodCatalogTree');
						commit('set', {type: 'category', items: undefined})
					};
				},
				error => {
					console.log(error);
				}
			)
		},
		/**
		 * Удалить представителя
		 * @param {idMerchant} - id Предтавителя
		 */
		deleteMerchant({state, commit}, idMerchant) {
			let arg = {
				params:{
					id_merchant :  idMerchant,
					action      : 'delete_merchant'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.clients, null,  arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						$$("ManagerListDt").remove(idMerchant);
						commit('set', {type: 'showDeleteMerchanttWnd', items: false})
						commit('set', {type: 'merchant',               items: undefined})

					}
				},
				error => {
					console.log(error);
				}
			)
		},
		/**
		 * Удалить представителя из магазина или из сети
		 * @param {idMerchant} - id Предтавителя
		 */
		deleteMerchantFrom({state, commit}, idMerchant) {
			let arg = {
				params:{
					id_merchant :  idMerchant,
					id_shop     :  state.shop ? state.shop.id : undefined,
					id_net      :  state.net  ? state.net.id  : undefined,
					action      : 'delete_merchant_from'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.clients, null,  arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						if (state.shop) {
							['name', 'phone', 'email'].forEach(key => {
								state.shop.merchant[key] = undefined;
							});
						} else {
							['merchant_name', 'merchant_phone', 'merchant_email'].forEach(key => {
								state.net[key] = '-';
							});
						}
						$$('NetListDt').unselectAll();
						commit('set', {type: 'showDeleteMerchanttWnd', items: false})
						commit('set', {type: 'net', items: undefined})
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		/**
		 * Удалить товар из коризины
		 * @param {idProd} - id  товара
		 */
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
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
					}
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
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						commit('set', {type: 'net', items: undefined})
					};
				},
				error => {
					console.log(error);
				}
			)
		},
		editCategory ({commit}, category) {
			// Очищаем список продуктов
			commit('set', {type: 'productList', items: undefined})

			let arg = {
				params:{
					'category.id'          : category.id,
					'category.name'        : category.name,
					'category.description' : category.description,
					'category.visible'     : category.visible,
					action                 : 'edit'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.category, null,  arg).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						commit('relodCatalogTree');
					}
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
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						if (body.products) {
							body.products.forEach(product => {
								// Вводим переменную для поиска
								product.search = true;
							})
						}
						commit('set', {type: 'allProducts', items: body.products})
					}
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
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						commit('set', {type: 'catalogTree', items: body.catalog.child})
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		getNetList({commit}) {
			// Включаем лоадер
			commit('set', {type: 'loaderNetList', items: true})
			// Очищаем спсок поиска киентов
			commit('set', {type: 'searchClient', items: undefined})
			// Очищаем список клиентов
			commit('set', {type: 'netList',  items: undefined})
			// Убираем выделение сети
			commit('set', {type: 'net', items: undefined})

			Vue.http.get(Conf.url.clients).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error',   items: undefined})
						commit('set', {type: 'netList', items: body.net_list})
						// Выключаем лоадер
						commit('set', {type: 'loaderNetList', items: false})
					}
				},
				error => {
				 	console.log(error);
				}
			)
		},
		getMerchant({state, commit}) {
			let arg;
			// Если есть выбранный магазин то берем представителя магазина
			// Иначе берем представителя сети
			if(state.shop) {
				arg = {
					params:{
						action  : 'shopMerchant',
						id_shop : state.shop.id
					},
					headers: {
						'Content-Type': 'text/plain'
					}
				}
			} else {
				arg = {
					params:{
						action : 'netMerchant',
						id_net : state.net.id
					},
					headers: {
						'Content-Type': 'text/plain'
					}
				}
			}

			Vue.http.get(Conf.url.clients, arg).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						commit('set', {type: 'merchant', items: body.merchant})
					}
				},
				error => {
				 	console.log(error);
				}
			)
		},
		/**
		 * Полчаем всех представителей
		 */
		getMerchantList({state, commit}) {
			// Включаем лоадер
			commit('set', {type: 'loaderMerchantList', items: true});

			let arg = {
				params:{
					action  : 'get_merchant_list',
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.clients, arg).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error',              items: undefined})
						commit('set', {type: 'loaderMerchantList', items: false});
						commit('set', {type: 'merchantList', items: body.merchant_list});
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
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})

						if (body.order.ttn_date)     body.order.ttn_date     = moment(body.order.ttn_date);
						if (body.order.deliver_date) body.order.deliver_date = moment(body.order.deliver_date);
						if (body.order.ctime)        body.order.ctime        = moment(body.order.ctime);

						commit('set', {type: 'order', items: body.order})
						commit('set', {type: 'documents', items: body.documents})
						document.location = '/#/order/' + body.order.id
					};
				},
				error => {
					console.log(error);
				}
			)
		},
		getOrders({state, commit}) {
			// Включаем лоадер
			commit('set', {type: 'loader', items: true})
			commit('set', {type: 'orders', items: undefined});

			let arg = {
				params:{
					filter : JSON.stringify(state.ordersFilter),
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.order, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						if (body.orders)
							body.orders.forEach(key => {
					 			key.ctime = moment(key.ctime)
					 		});

					 	commit('set', {type: 'orders', items: body.orders});
					 	// Выключаем лоадер
						commit('set', {type: 'loader', items: false})
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		getProductList({commit}, idCategory) {
			// Очищаем список продуктов
			commit('set', {type: 'productList', items: undefined})
			// Включаем лоадер
			commit('set', {type: 'loader', items: true})

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
					if (body.ERROR) {
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error',       items: undefined})
						commit('set', {type: 'productList', items: body.category.products});
						// Выключаем лоадер
						commit('set', {type: 'loader', items: false})
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		getShops({state, commit}) {
			// Очищаем спсок поиска киентов
			commit('set', {type: 'shopList', items: undefined})
			let arg = {
				params:{
					action : 'shops',
					id_net : state.net.id
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.clients, arg).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						commit('set', {type: 'shopList', items: body.shops})
					}
				},
				error => {
				 	console.log(error);
				}
			)
		},
		getShopMerchant({state, commit}) {
			let arg = {
				params:{
					action : 'shopMerchant',
					id_net : state.idActiveClient
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.clients, arg).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						commit('set', {type: 'merchant', items: body.merchant})
					}
				},
				error => {
				 	console.log(error);
				}
			)
		},
		getStatistic({commit}) {
			// Включаем лоадер
			commit('set', {type: 'loader', items: true})
			let arg = {
				params:{
					action : 'statistic',
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.order, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error',       items: undefined})
						commit('set', {type: 'statNet',     items: body.net})
						commit('set', {type: 'statShop',    items: body.shop})
						commit('set', {type: 'statProduct', items: body.product})
					}
				},
				error => {
					console.log(error);
				}
			)
			commit('set', {type: 'loader', items: false})
		},
		// Получаем список стусов
		getStatus({commit}) {
			let arg = {
				params:{
					action : 'status',
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.order, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
					 	commit('set', {type: 'allOrderStatus', items: body.status});
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
					if (body.ERROR) {
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						commit('relodCatalogTree');
					}
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
					if (body.ERROR) {
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						commit('relodCatalogTree');
					}
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
					if (body.ERROR) {
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'error', items: undefined})
						commit('relodCatalogTree');
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
			if (product.properties.elements)
				product.properties = product.properties.elements[0].extend.properties.elements
			commit('set', {type: 'product', items: product})
		},
		sendRegEmail({state, commit}, email) {
			commit('set', {type: 'sendMailLoader', items: true})
			let arg = {
				params:{
					action      : 'registration',
					email       : email,
					id_merchant : state.merchant.id,
					id_net      : state.net.id,
					id_shop     : state.shop ? state.shop.id : undefined,
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.clients, arg).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
						commit('set', {type: 'sendMailLoader', items: false})
					} else {
						if (body.is_merchant) {
							commit('set', {type: 'merchantAlreadyReg', items: body.is_merchant})
							commit('set', {type: 'sendMailLoader',     items: false})
						} else {
							// Добавляем емейл в выбранную сеть

							if (state.shop) {
								state.shop.merchant.email = body.merchant.email;
								state.shop.merchant.id    = body.merchant.id;
								state.shop.id_merchant    = body.merchant.id;
							} else {
								state.net.merchant.email = body.merchant.email;
								state.net.merchant_email = body.merchant.email;
								state.net.merchant.id    = body.merchant.id;
								state.net.id_merchant    = body.merchant.id;
							}

							commit('set', {type: 'merchantAlreadyReg', items: undefined})
							commit('set', {type: 'sendMailLoader',     items: false})
							commit('set', {type: 'isSendMail',         items: true})
							commit('set', {type: 'shop',               items: undefined})
							// Убираем выделение в таблице Клиенты
							commit('set', {type: 'net', items: undefined})
							$$('NetListDt').unselectAll();
						}
					}
				},
				error => {
				 	console.log(error);
				}
			)
		},
	}
})

export default store
