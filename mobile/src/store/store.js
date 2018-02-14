import Vue         from 'vue'
import Vuex        from 'vuex'
import VueResource from 'vue-resource'
import Conf        from '../../config/url.js'
import Cookies     from 'js-cookie'
import moment      from 'moment'
import 'moment/locale/ru'


Vue.use(Vuex)
Vue.use(VueResource)

const notifierStore = new Vuex.Store({
	state: {
		newsList    : undefined, // список новостей,
		news        : undefined, // выбранная новость,
		error       : undefined, // ошибка
		authError   : undefined, // ошибка авторизации
		session     : undefined, // объект Сессии
	},
	getters: {
		newsList(state){
			return state.newsList
		},
		news(state){
			return state.news
		},
		error(state){
			return state.error
		},
		authError(state){
			return state.authError
		},
		session(state){
			return state.session
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
			// поиCк индекC для удаления
			let indexToRemove = state[type].findIndex(item => item[key] == value);
			state[type].splice(indexToRemove , 1);
		}
	},
	actions: {
		addDeleteFavorte({state, commit}, news) {
			let arg = {
				params:{
					token   : Cookies.get('token'),
					action  : 'add_delete_favorite',
					id_news : news.id
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.news, null, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'authError', items: body.ERROR})
						if (body.ERROR.AUTH) {
							document.location.hash = '/auth'
						}
					} else {
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		addFirebaseToken({state, commit}) {
			var firebaseToken;
			if (window.FirebasePlugin) {
				window.FirebasePlugin.unregister();
				// Обновляем токен для надежности
				window.FirebasePlugin.onTokenRefresh(function(token) {
					// Подписываемся на группу
					window.FirebasePlugin.subscribe('all');

					let arg = {
					params:{
						action         : 'add_firebase_token',
						token          : Cookies.get('token'),
						firebase_token : token
					},
						headers: {
							'Content-Type': 'text/plain'
						}
					}

					Vue.http.post(Conf.url.manager, null, arg).then(
						response => {
							let body = response.body
							if (body.ERROR) {
								console.log(body.ERROR)
								commit('set', {type: 'error', items: body.ERROR})
								if (body.ERROR.AUTH) {
									document.location.hash = '/auth'
								}
							} else {
								commit('set', {type: 'session', items: body.SESSION})

								state.session.users_tag.forEach(tag => {
									window.FirebasePlugin.subscribe(tag.id);
								})
							}
						},error => {
							console.log(error);
						}
					)
				},function(error) {
					console.log(error)
				})
			}
		},
		auth({state, commit, dispatch}, authData) {
			let arg = {
				params:{
					password : authData.password,
					login    : authData.login,
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.news, null, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'authError', items: body.ERROR})
						if (body.ERROR.AUTH) {
							document.location.hash = '/auth'
						}
					} else {
						Cookies.set('token', body.SESSION.token);
						dispatch('addFirebaseToken')
						document.location.hash = '/news/'
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		newsList({state, commit, dispatch}, sort) {
			// Очищаем список новостей
			commit('set', {type: 'newsList', items: undefined})

			let arg = {
				params:{
					action : 'list',
					token  : Cookies.get('token'),
					sort   : sort ? sort : 'month'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.news, arg).then(
				response => {
					let body = response.body;
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
						if (body.ERROR.AUTH) {
							document.location.hash = '/auth'
						}
					} else {
						body.news_list.forEach(news => {
							if (news.ctime){
								news.ctime = moment(news.ctime);
							}
						})
						commit('set', {type: 'newsList', items: body.news_list})
						dispatch('addFirebaseToken')
						document.location.hash = '/news'
					}
				},
				error => {
					console.log(error);
				}
			)
		},
	}
})

export default notifierStore