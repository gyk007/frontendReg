import Vue         from 'vue'
import Vuex        from 'vuex'
import VueResource from 'vue-resource'
import $           from 'jquery'
import Conf        from '../conf/conf.js'

Vue.use(Vuex)
Vue.use(VueResource)

const catalogStore = new Vuex.Store({
	state: {
		catalogTree : [],
		productList : [],
		category    : {},
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
					let body = JSON.parse(response.body);
					state.catalogTree = body.catalog.child
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
					//'Content-Type': 'application/json'
				}
			}

			Vue.http.post(Conf.url.category, null,  arg).then(
				response => {
					let id = JSON.parse(response.body);
					category.id = id;
					commit('addItemToArry', {type: 'catalogTree', item: category});

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
					action                 : 'edit'
				},
				headers: {
					//'Content-Type': 'application/json'
				}
			}

			Vue.http.post(Conf.url.category, null,  arg).then(
				response => {
					let data = JSON.parse(response.body);
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
					let body = JSON.parse(response.body);
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
					category: idCategory
				},
				headers: {
					//'Content-Type': 'application/json'
				}
			}

			Vue.http.get(Conf.url.catalog, arg).then(
				response => {
					let body = JSON.parse(response.body);

					// Очищаем список продуктов
					commit('set', {type: 'productList', items: null});
					if (body.category.extend.products.elements.length)
						commit('set', {type: 'productList', items: body.category.extend.products.elements});
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
					let data = JSON.parse(response.body);
					console.log(idCategory)
					commit('deleteItemFromArry', {type: 'catalogTree', key: 'id', value: idCategory});

				},
				error => {
					console.log(error);
				}
			)
		},

		selectCategory({commit}, category) {
			commit('set', {type: 'category', items: category});
		}
	}
})

export default catalogStore