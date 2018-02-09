import Vue         from 'vue'
import Vuex        from 'vuex'
import VueResource from 'vue-resource'
import Conf        from '../../config/url.js'
import Cookies     from 'quasar'
import 'moment/locale/ru'


Vue.use(Vuex)
Vue.use(VueResource)

const notifierStore = new Vuex.Store({
	state: {

	},
	getters: {

	},
	mutations: {
		set(state, {type, items}) {
			state[type] = items
		},
		addItemToArry(state, {type, item}) {
			state[type].push(item)
		},
		deleteItemFromArry(state, {type, key, value}) {
			// поиCк индекC для удаления
			let indexToRemove = state[type].findIndex(item => item[key] == value);
			state[type].splice(indexToRemove , 1);
		}
	},
	actions: {

	}
})

export default notifierStore