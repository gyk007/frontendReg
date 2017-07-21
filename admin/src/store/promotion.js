import Vue         from 'vue'
import Vuex        from 'vuex'
import VueResource from 'vue-resource'
import Conf        from '../conf/conf.js'

Vue.use(Vuex)
Vue.use(VueResource)

const promotionStore = new Vuex.Store({
	state: {
		promotionList : [],
	},
	getters: {
		promotionList(state) {
			return  state.promotionList
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
		relodPromotionList(state) {
			Vue.http.get(Conf.url.promotion).then(
				response => {
					let body = response.body;
					state.promotionList = body.promotion
				},
				error => {
				 	console.log(error);
				}
			)
		}
	},
	actions: { }
})

export default promotionStore