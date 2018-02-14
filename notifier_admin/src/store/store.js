import Vue         from 'vue'
import Vuex        from 'vuex'
import VueResource from 'vue-resource'
import Conf        from '../../config/url.js'
import $           from 'jquery-ajax'
import 'moment/locale/ru'


Vue.use(Vuex)
Vue.use(VueResource)

const notifierStore = new Vuex.Store({
	state: {
		newsList    : undefined, // список новостей,
		managerList : undefined, // список менеджеров,
		tagList     : undefined, // список тегов,
		news        : undefined, // выбранная новость,
		manager     : undefined, // выбранный менеджер,
		tag         : undefined, // тег,
		error       : undefined, // ошибка
	},
	getters: {
		newsList(state){
			return state.newsList
		},
		managerList(state){
			return state.managerList
		},
		news(state){
			return state.news
		},
		manager(state){
			return state.manager
		},
		tagList(state){
			return state.tagList
		},
		tag(state){
			return state.tag
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
		addNews({state, commit, dispatch}, file) {
			var arg = new FormData();

			if (state.news.id) {
				arg.append('news.id', state.news.id);
			}

			arg.append('news.title',       state.news.title);
			arg.append('news.text',        state.news.text);
			arg.append('news.description', state.news.description);
			arg.append('news.tags',        state.news.tags);
			arg.append('upload', file);
			arg.append('action', 'add');

			$.ajax({
				url:  Conf.url.news,
				type: 'POST',
				data: arg,
				processData: false,
				contentType: false,
				beforeSend : function(){

				},
				success : function(json){
					dispatch('newsList')
				}
			});
		},
		addManager({state, commit, dispatch}) {
			var arg = new FormData();

			if (state.manager.id) {
				arg.append('manager.id', state.manager.id);
			}

			arg.append('manager.name',     state.manager.name);
			arg.append('manager.email',    state.manager.email);
			arg.append('manager.password', state.manager.password);
			arg.append('manager.phone',    state.manager.phone);
			arg.append('manager.tags',     state.manager.tags);
			arg.append('action',           'add');

			$.ajax({
				url:  Conf.url.manager,
				type: 'POST',
				data: arg,
				processData: false,
				contentType: false,
				error : function() {
				},
				success : function(json){
					let body = JSON.parse(json)
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						dispatch('managerList')
					}
				}
			});
		},
		addTag({state, commit, dispatch}) {
			let arg = {
				params:{
					'tag.id'          : state.tag.id ? state.tag.id : undefined,
					'tag.name'        : state.tag.name,
					'tag.description' : state.tag.description,

					action             : 'add'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.tag, null, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						dispatch('tagList')
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		deleteNews({state, commit, dispatch}) {
			let arg = {
				params:{
					action    : 'delete',
					'news.id' : state.news.id,
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
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'news', items: undefined})
						dispatch('newsList')
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		deleteManager({state, commit, dispatch}) {
			let arg = {
				params:{
					action    : 'delete',
					'manager.id' : state.manager.id,
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
					} else {
						commit('set', {type: 'manager', items: undefined})
						dispatch('managerList')
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		deleteTag({state, commit, dispatch}) {
			let arg = {
				params:{
					action   : 'delete',
					'tag.id' : state.tag.id,
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.tag, null, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'tag', items: undefined})
						dispatch('tagList')
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		newsList({state, commit}) {
			// Очищаем список новостей
			commit('set', {type: 'newsList', items: undefined})

			let arg = {
				params:{
					action : 'list'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.news, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'newsList', items: body.news_list})
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		managerList({state, commit}) {
			// Очищаем список новостей
			commit('set', {type: 'newsList', items: undefined})

			let arg = {
				params:{
					action : 'list'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.manager, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'managerList', items: body.manager_list})
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		tagList({state, commit, dispatch}) {
			let arg = {
				params:{
					action : 'list'
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.post(Conf.url.tag, null, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
					} else {
						commit('set', {type: 'tagList', items: body.tag_list})
					}
				},
				error => {
					console.log(error);
				}
			)
		},
		sendNotification({state, commit}, action) {
			let arg = {
				params:{
					action : action,
					id_news: state.news.id,
				},
				headers: {
					'Content-Type': 'text/plain'
				}
			}

			Vue.http.get(Conf.url.firebase, arg).then(
				response => {
					let body = response.body
					if (body.ERROR) {
						console.log(body.ERROR)
						commit('set', {type: 'error', items: body.ERROR})
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