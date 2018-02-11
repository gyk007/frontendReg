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
		addFirebaseToken({state, commit}, token) {		 
			var firebaseToken;
			if (window.FirebasePlugin) {
				// Обновляем токен для надежности
				window.FirebasePlugin.onTokenRefresh(function(token) {
					alert(token)
					window.FirebasePlugin.subscribe('all')
					alert(token)
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
							console.log(body);
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
									console.log(news); 
								})

								commit('set', {type: 'newsList', items: body.news_list})
							}
						},error => {
							console.log(error);
						}
					)				 
				},function(error) {
					console.log(error)
					alert('Возникла ошибка с сообщениями')
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
					let body = response.body
					console.log(body);
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