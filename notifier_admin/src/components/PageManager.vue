<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
  	<q-btn icon="add box" color="primary" small class='btn_add_edit' @click="$refs.addManager.open()">
		Добавить
	</q-btn>

  	<ManagerTable></ManagerTable>

	<q-modal ref="addManager">
		<div class='modal_body'>
			<h5>Пользователь</h5>

			<q-input stack-label="Email"   v-model="manager.email"        class='modal_input' />
			<q-input stack-label="Пароль"  v-model="manager.password"        class='modal_input' />

			<q-select
				multiple
				chips
				color="purple"
				float-label="Теги"
				v-model="manager.tags"
				:options="tagList"
			/>

			<q-input stack-label="Имя"     v-model="manager.name"        class='modal_input' />
			<q-input stack-label="Телефон" v-model="manager.phone"        class='modal_input' />

			<div class="btn_block">
				<q-btn color="secondary"   icon="add box" @click="add()">Сохранить</q-btn>
				<q-btn color="deep-orange" icon="clear"   @click="$refs.addManager.close()">Закрыть</q-btn>
			</div>
			<div class="clear"></div>
		</div>
	</q-modal>

  </div>
</template>

<script>
import ManagerTable from './views/ManagerTable.vue'
import store        from '../store/store.js'

import {QModal, QBtn, QIcon, QInput, QField, QSelect} from 'quasar'

export default {
  name: 'manager',
  store: store,
  components: {ManagerTable, QModal, QBtn, QIcon, QInput, QField, QSelect},
  data() {
		return {
			manager: {
				name     : undefined,
				email    : undefined,
				password : undefined,
				phone    : undefined,
				tags     : []
			}
		}
	},
	computed: {
		tagList() {
			let  list = []
			if (this.$store.getters.tagList) {
				this.$store.getters.tagList.forEach(tag => {
					let listItem = {
						label: tag.name,
						value: tag.id
					}

					list.push(listItem)
				})
			}

			return list
		},
	},
	methods: {
		add() {
			console.log(this.news)
			this.$refs.addManager.close()
			this.$store.commit('set', {type: 'manager', items: this.manager})
			this.$store.dispatch('addManager')
			this.manager = {
				name     : undefined,
				email    : undefined,
				password : undefined,
				phone    : undefined,
				tags     : []
			}
		}
	}
}
</script>

<style>

.btn_add_edit {
	margin:  15px;
	margin-left: 0px;
}
.modal_body {
	padding: 15px;
	min-width: 400px;
}
.modal_input {
	margin-bottom: 15px;
}

.btn_block {
	margin: 15px;
	margin-right: 0px;
	float: right;
}
.clear {
	clear: both;
}

</style>
